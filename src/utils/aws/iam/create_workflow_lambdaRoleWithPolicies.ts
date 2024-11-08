import {
  IAMClient,
  CreateRoleCommand,
  PutRolePolicyCommand,
  waitUntilRoleExists,
} from "@aws-sdk/client-iam";
import { config } from "../../../config/client";

import { configHarrier } from "../../../config/configHarrier";
const iamClient = new IAMClient({ region: config.region });

// THIS IS CURRENTLY JUST FOR THE `workflow` lambda!!!  can be generalized later (today?)
/* 

`workflow` lambda needs to be able to:
- READ from aws secrets manager
- CreateNetworkInterface
- 

`cleanup` lambda needs to be able to:
- S3 read/write

*/

export default async function create_workflow_lambdaRoleWithPolicies(
  roleName: string
) {
  const input = {
    RoleName: roleName,
    Path: "/service-role/",
    AssumeRolePolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Action: "sts:AssumeRole",
        },
      ],
    }),
  };

  const roleResponse = await iamClient.send(new CreateRoleCommand(input));

  if (!roleResponse.Role?.Arn) {
    throw new Error("Failed to create IAM role: " + roleName);
  }
  // MORE POLICIES
  // S3 stuff

  const ec2Policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "ec2:*",
        Effect: "Allow",
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: "elasticloadbalancing:*",
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: "cloudwatch:*",
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: "autoscaling:*",
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: "iam:CreateServiceLinkedRole",
        Resource: "*",
        Condition: {
          StringEquals: {
            "iam:AWSServiceName": [
              "autoscaling.amazonaws.com",
              "ec2scheduled.amazonaws.com",
              "elasticloadbalancing.amazonaws.com",
              "spot.amazonaws.com",
              "spotfleet.amazonaws.com",
              "transitgateway.amazonaws.com",
            ],
          },
        },
      },
    ],
  };

  const ssmPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "cloudwatch:PutMetricData",
          "ds:CreateComputer",
          "ds:DescribeDirectories",
          "ec2:DescribeInstanceStatus",
          "logs:*",
          "ssm:*",
          "ec2messages:*",
        ],
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: "iam:CreateServiceLinkedRole",
        Resource:
          "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
        Condition: {
          StringLike: {
            "iam:AWSServiceName": "ssm.amazonaws.com",
          },
        },
      },
      {
        Effect: "Allow",
        Action: [
          "iam:DeleteServiceLinkedRole",
          "iam:GetServiceLinkedRoleDeletionStatus",
        ],
        Resource:
          "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
      },
      {
        Effect: "Allow",
        Action: [
          "ssmmessages:CreateControlChannel",
          "ssmmessages:CreateDataChannel",
          "ssmmessages:OpenControlChannel",
          "ssmmessages:OpenDataChannel",
        ],
        Resource: "*",
      },
    ],
  };
  //  {
  //     Version: "2012-10-17",
  //     Statement: [
  //       {
  //         Effect: "Allow",
  //         Action: [
  //           "ec2:DescribeInstances",
  //           "ec2:StartInstances",
  //           "ec2:StopInstances",
  //           "ec2:RebootInstances",
  //           // NEW POLICIES to facilitate the `workflow` lambda's ability to create ENIs and attach them to instances
  //           "ec2:CreateNetworkInterface",
  //           "ec2:DescribeNetworkInterfaces",
  //           "ec2:DeleteNetworkInterface",
  //         ],
  //         Resource: "*",
  //         // Condition: {
  //         //   StringEquals: {
  //         //     "ec2:ResourceTag/Name": "specific-instance-name", // WOOK, SHANE This is where we would specify the instance name or tag
  //         //   },
  //         // },
  //       },
  //     ],
  //   };

  const logsPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Resource: `arn:aws:logs:us-east-1:536697269866:log-group:${configHarrier.logGroup}:*`,
      },
    ],
  };

  // attach policies to the role we created
  await iamClient.send(
    new PutRolePolicyCommand({
      RoleName: roleName,
      PolicyName: `${roleName}_LambdaEc2Policy`,
      PolicyDocument: JSON.stringify(ec2Policy),
    })
  );

  await iamClient.send(
    new PutRolePolicyCommand({
      RoleName: roleName,
      PolicyName: `${roleName}_LambdaSsmPolicy`,
      PolicyDocument: JSON.stringify(ssmPolicy),
    })
  );

  await iamClient.send(
    new PutRolePolicyCommand({
      RoleName: roleName,
      PolicyName: `${roleName}_LambdaLogsPolicy`,
      PolicyDocument: JSON.stringify(logsPolicy),
    })
  );

  console.log("✅ attached 2 policy statements to new role");

  // EXTRACT
  try {
    const waitResult = await waitUntilRoleExists(
      {
        client: iamClient,
        maxWaitTime: 120,
        minDelay: 5,
      },
      {
        RoleName: roleName,
      }
    );

    if (`${waitResult.state}` !== "SUCCESS") {
      throw new Error("Role creation failed");
    }

    console.log("✅ role exists");
    return roleResponse.Role.Arn;
  } catch (error: unknown) {
    console.error("Error waiting for role to exist: ", error);
    throw new Error("Role creation failed");
  }
}
