"use strict";
// TODO: configure the ec2 policies such that the lambda can start and stop specifically tagged instances (Agent: Harrier-Runner)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceRole = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
// import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
// import { STSClient } from "@aws-sdk/client-sts";
const configHarrier_1 = require("../../../config/configHarrier");
const iamClient = new client_iam_1.IAMClient({ region: configHarrier_1.configHarrier.region });
// const stsClient = new STSClient({ region: configHarrier.region });
function createServiceRole(roleName, policyDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // previously, we checked if the role already existed and if so, just returned the existingRoleArn
            const arn = yield createRole(roleName);
            yield iamClient.send(new client_iam_1.PutRolePolicyCommand({
                RoleName: roleName,
                PolicyName: `${roleName}-policy`,
                PolicyDocument: policyDocument,
            }));
            // previously, if the !roleExistsAndIsAssumable, throw an error
            console.log("🚦 ***waiting for role to PROPAGATE***");
            yield new Promise((res) => setTimeout(res, 10000));
            console.log("✅ policies ATTACHED");
            return arn;
        }
        catch (error) {
            console.error("❌ Error in createWorkflowLambdaServiceRole ", error);
            throw new Error("❌");
        }
    });
}
exports.createServiceRole = createServiceRole;
function createRole(roleName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield iamClient.send(new client_iam_1.CreateRoleCommand({
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
        }));
        if (!((_a = response.Role) === null || _a === void 0 ? void 0 : _a.Arn)) {
            throw new Error(`❌ Failed to create IAM role: ${roleName}`);
        }
        console.log(`✅ created ${roleName} `);
        return response.Role.Arn;
    });
}
// if (!(await roleExistsAndIsAssumable(roleName))) {
//   throw new Error("Role is not assumable");
// }
// const existingRoleArn = await checkIfRoleExists(roleName);
// if (existingRoleArn) {
//   console.log(`Role ${roleName} already exists, skipping creation...`);
//   return existingRoleArn;
// }
// async function roleExistsAndIsAssumable(roleName: string): Promise<boolean> {
//   const waitResult = await waitUntilRoleExists(
//     { client: iamClient, maxWaitTime: 120, minDelay: 5 },
//     { RoleName: roleName }
//   );
//   if (`${waitResult.state}` !== "SUCCESS") {
//     return false;
//   }
//   try {
//     const assumedRole = await stsClient.send(
//       new AssumeRoleCommand({
//         RoleArn: `arn:aws:iam::${configHarrier.awsAccountId}:role/${roleName}`,
//         RoleSessionName: "TestSession",
//       })
//     );
//     return !!assumedRole.Credentials;
//   } catch (error) {
//     console.error("Error assuming role: ", error);
//     return false;
//   }
// }
// async function checkIfRoleExists(roleName: string): Promise<string | null> {
//   try {
//     const response = await iamClient.send(
//       new GetRoleCommand({ RoleName: roleName })
//     );
//     return response.Role?.Arn || null;
//   } catch (error: unknown) {
//     if (error instanceof Error && error.name === "NoSuchEntityException") {
//       return null;
//     }
//     throw error;
//   }
// }
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
