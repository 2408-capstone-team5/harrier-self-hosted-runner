import {
  IAMClient,
  CreateRoleCommand,
  PutRolePolicyCommand,
} from "@aws-sdk/client-iam";
import { config } from "../../../config/client";

const iamClient = new IAMClient({ region: config.region });

// THIS IS CURRENTLY JUST FOR THE `workflow` lambda!!!  can be generalized later (today?)
/* 

`workflow` lambda needs to be able to:
- READ from aws secrets manager

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

  console.log("roleResponse: ", roleResponse);

  const ec2Policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ec2:DescribeInstances",
          "ec2:StartInstances",
          "ec2:StopInstances",
          "ec2:RebootInstances",
        ],
        Resource: "*",
        Condition: {
          StringEquals: {
            "ec2:ResourceTag/Name": "specific-instance-name", // WOOK, SHANE This is where we would specify the instance name or tag
          },
        },
      },
    ],
  };

  const logGroup = "/aws/lambda/harrier-lambda"; // HARDCODED

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
        Resource: `arn:aws:logs:us-east-1:536697269866:log-group:${logGroup}:*`, // HARDCODED
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
      PolicyName: `${roleName}_LambdaLogsPolicy`,
      PolicyDocument: JSON.stringify(logsPolicy),
    })
  );

  console.log("successfully attached policies to role");

  console.log("roleResponse: ", roleResponse);

  return roleResponse.Role.Arn;
}
