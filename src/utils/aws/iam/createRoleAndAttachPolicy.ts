// TODO: configure the ec2 policies such that the lambda can start and stop specifically tagged instances (Agent: Harrier-Runner)

import {
  IAMClient,
  CreateRoleCommand,
  PutRolePolicyCommand,
} from "@aws-sdk/client-iam";

import { configHarrier } from "../../../config/configHarrier";

const iamClient = new IAMClient({ region: configHarrier.region });

export async function createRoleAndAttachPolicy(
  roleName: string,
  policyDocument: string
) {
  try {
    const roleArn = await createRole(roleName);
    await attachPolicy(roleName, policyDocument);
    return roleArn;
  } catch (error) {
    console.error("❌ Error in createRoleAndAttachPolicy ", error);
    throw new Error("❌");
  }
}

async function createRole(roleName: string) {
  const response = await iamClient.send(
    new CreateRoleCommand({
      RoleName: roleName,
      Path: "/service-role/",
      AssumeRolePolicyDocument: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { Service: "lambda.amazonaws.com" },
            Action: "sts:AssumeRole",
          },
        ],
      }),
    })
  );

  if (!response.Role?.Arn) {
    throw new Error(`❌ Failed to create IAM role: ${roleName}`);
  }
  console.log(`✅ created ${roleName} `);
  return response.Role.Arn;
}

async function attachPolicy(roleName: string, policyDocument: string) {
  await iamClient.send(
    new PutRolePolicyCommand({
      RoleName: roleName,
      PolicyName: `${roleName}-policy`,
      PolicyDocument: policyDocument,
    })
  );

  console.log("🚦 ***waiting for role to PROPAGATE***");
  await new Promise((res) => setTimeout(res, 10_000));
  console.log("✅ policies ATTACHED");
}

//     {
//       name: `${roleName}_LambdaEc2Policy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           { Action: "ec2:*", Effect: "Allow", Resource: "*" },
//           { Effect: "Allow", Action: "elasticloadbalancing:*", Resource: "*" },
//           { Effect: "Allow", Action: "cloudwatch:*", Resource: "*" },
//           { Effect: "Allow", Action: "autoscaling:*", Resource: "*" },
//           {
//             Effect: "Allow",
//             Action: "iam:CreateServiceLinkedRole",
//             Resource: "*",
//             Condition: {
//               StringEquals: {
//                 "iam:AWSServiceName": [
//                   "autoscaling.amazonaws.com",
//                   "ec2scheduled.amazonaws.com",
//                   "elasticloadbalancing.amazonaws.com",
//                   "spot.amazonaws.com",
//                   "spotfleet.amazonaws.com",
//                   "transitgateway.amazonaws.com",
//                 ],
//               },
//             },
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_LambdaSsmPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Action: [
//               "cloudwatch:PutMetricData",
//               "ds:CreateComputer",
//               "ds:DescribeDirectories",
//               "ec2:DescribeInstanceStatus",
//               "logs:*",
//               "ssm:*",
//               "ec2messages:*",
//             ],
//             Resource: "*",
//           },
//           {
//             Effect: "Allow",
//             Action: "iam:CreateServiceLinkedRole",
//             Resource:
//               "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
//             Condition: {
//               StringLike: { "iam:AWSServiceName": "ssm.amazonaws.com" },
//             },
//           },
//           {
//             Effect: "Allow",
//             Action: [
//               "iam:DeleteServiceLinkedRole",
//               "iam:GetServiceLinkedRoleDeletionStatus",
//             ],
//             Resource:
//               "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
//           },
//           {
//             Effect: "Allow",
//             Action: [
//               "ssmmessages:CreateControlChannel",
//               "ssmmessages:CreateDataChannel",
//               "ssmmessages:OpenControlChannel",
//               "ssmmessages:OpenDataChannel",
//             ],
//             Resource: "*",
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_LambdaLogsPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Action: [
//               "logs:CreateLogGroup",
//               "logs:CreateLogStream",
//               "logs:PutLogEvents",
//             ],
//             Resource: `arn:aws:logs:us-east-1:${configHarrier.awsAccountId}:log-group:${configHarrier.logGroup}:*`,
//           },
//         ],
//       },
//     },
//     // the below are copied from `joel_test-role-927gtd4h`:

//     {
//       name: `${roleName}_DescribePolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           { Effect: "Allow", Action: "ec2:Describe*", Resource: "*" },
//           {
//             Effect: "Allow",
//             Action: "elasticloadbalancing:Describe*",
//             Resource: "*",
//           },
//           {
//             Effect: "Allow",
//             Action: [
//               "cloudwatch:ListMetrics",
//               "cloudwatch:GetMetricStatistics",
//               "cloudwatch:Describe*",
//             ],
//             Resource: "*",
//           },
//           { Effect: "Allow", Action: "autoscaling:Describe*", Resource: "*" },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_S3Policy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Action: ["s3:*", "s3-object-lambda:*"],
//             Resource: "*",
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_MiscPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Action: [
//               "cloudwatch:PutMetricData",
//               "ds:CreateComputer",
//               "ds:DescribeDirectories",
//               "ec2:DescribeInstanceStatus",
//               "logs:*",
//               "ssm:*",
//               "ec2messages:*",
//             ],
//             Resource: "*",
//           },
//           {
//             Effect: "Allow",
//             Action: "iam:CreateServiceLinkedRole",
//             Resource:
//               "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
//             Condition: {
//               StringLike: {
//                 "iam:AWSServiceName": "ssm.amazonaws.com",
//               },
//             },
//           },
//           {
//             Effect: "Allow",
//             Action: [
//               "iam:DeleteServiceLinkedRole",
//               "iam:GetServiceLinkedRoleDeletionStatus",
//             ],
//             Resource:
//               "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
//           },
//           {
//             Effect: "Allow",
//             Action: [
//               "ssmmessages:CreateControlChannel",
//               "ssmmessages:CreateDataChannel",
//               "ssmmessages:OpenControlChannel",
//               "ssmmessages:OpenDataChannel",
//             ],
//             Resource: "*",
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_LogPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Action: "logs:CreateLogGroup",
//             Resource: "arn:aws:logs:us-east-1:${configHarrier.awsAccountId}:*",
//           },
//           {
//             Effect: "Allow",
//             Action: ["logs:CreateLogStream", "logs:PutLogEvents"],
//             Resource: [
//               "arn:aws:logs:us-east-1:${configHarrier.awsAccountId}:log-group:/aws/lambda/joel_test:*",
//             ],
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_BasePermissionsPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Sid: "BasePermissions",
//             Effect: "Allow",
//             Action: [
//               "secretsmanager:*",
//               "cloudformation:CreateChangeSet",
//               "cloudformation:DescribeChangeSet",
//               "cloudformation:DescribeStackResource",
//               "cloudformation:DescribeStacks",
//               "cloudformation:ExecuteChangeSet",
//               "docdb-elastic:GetCluster",
//               "docdb-elastic:ListClusters",
//               "ec2:DescribeSecurityGroups",
//               "ec2:DescribeSubnets",
//               "ec2:DescribeVpcs",
//               "kms:DescribeKey",
//               "kms:ListAliases",
//               "kms:ListKeys",
//               "lambda:ListFunctions",
//               "rds:DescribeDBClusters",
//               "rds:DescribeDBInstances",
//               "redshift:DescribeClusters",
//               "redshift-serverless:ListWorkgroups",
//               "redshift-serverless:GetNamespace",
//               "tag:GetResources",
//             ],
//             Resource: "*",
//           },
//           {
//             Sid: "LambdaPermissions",
//             Effect: "Allow",
//             Action: [
//               "lambda:AddPermission",
//               "lambda:CreateFunction",
//               "lambda:GetFunction",
//               "lambda:InvokeFunction",
//               "lambda:UpdateFunctionConfiguration",
//             ],
//             Resource: "arn:aws:lambda:*:*:function:SecretsManager*",
//           },
//           {
//             Sid: "SARPermissions",
//             Effect: "Allow",
//             Action: [
//               "serverlessrepo:CreateCloudFormationChangeSet",
//               "serverlessrepo:GetApplication",
//             ],
//             Resource: "arn:aws:serverlessrepo:*:*:applications/SecretsManager*",
//           },
//           {
//             Sid: "S3Permissions",
//             Effect: "Allow",
//             Action: ["s3:GetObject"],
//             Resource: [
//               "arn:aws:s3:::awsserverlessrepo-changesets*",
//               "arn:aws:s3:::secrets-manager-rotation-apps-*/*",
//             ],
//           },
//         ],
//       },
//     },
//     {
//       name: `${roleName}_StartInstancesPolicy`,
//       document: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Sid: "VisualEditor0",
//             Effect: "Allow",
//             Action: "ec2:StartInstances",
//             Resource: "*",
//           },
//         ],
//       },
//     },
//   ];
