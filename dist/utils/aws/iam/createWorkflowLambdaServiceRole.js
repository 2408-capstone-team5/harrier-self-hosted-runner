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
const client_iam_1 = require("@aws-sdk/client-iam");
const client_sts_1 = require("@aws-sdk/client-sts");
const configHarrier_1 = require("../../../config/configHarrier");
const iamClient = new client_iam_1.IAMClient({ region: configHarrier_1.configHarrier.region });
const stsClient = new client_sts_1.STSClient({ region: configHarrier_1.configHarrier.region });
function checkIfRoleExists(roleName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield iamClient.send(new client_iam_1.GetRoleCommand({ RoleName: roleName }));
            return ((_a = response.Role) === null || _a === void 0 ? void 0 : _a.Arn) || null;
        }
        catch (error) {
            if (error instanceof Error && error.name === "NoSuchEntityException") {
                return null;
            }
            throw error;
        }
    });
}
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
            throw new Error(`Failed to create IAM role: ${roleName}`);
        }
        return response.Role.Arn;
    });
}
function attachPolicies(roleName) {
    return __awaiter(this, void 0, void 0, function* () {
        const policies = [
            {
                name: `${roleName}_LambdaEc2Policy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        { Action: "ec2:*", Effect: "Allow", Resource: "*" },
                        { Effect: "Allow", Action: "elasticloadbalancing:*", Resource: "*" },
                        { Effect: "Allow", Action: "cloudwatch:*", Resource: "*" },
                        { Effect: "Allow", Action: "autoscaling:*", Resource: "*" },
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
                },
            },
            {
                name: `${roleName}_LambdaSsmPolicy`,
                document: {
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
                            Resource: "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
                            Condition: {
                                StringLike: { "iam:AWSServiceName": "ssm.amazonaws.com" },
                            },
                        },
                        {
                            Effect: "Allow",
                            Action: [
                                "iam:DeleteServiceLinkedRole",
                                "iam:GetServiceLinkedRoleDeletionStatus",
                            ],
                            Resource: "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
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
                },
            },
            {
                name: `${roleName}_LambdaLogsPolicy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "logs:CreateLogGroup",
                                "logs:CreateLogStream",
                                "logs:PutLogEvents",
                            ],
                            Resource: `arn:aws:logs:us-east-1:536697269866:log-group:${configHarrier_1.configHarrier.logGroupName}:*`, // @JOEL COME BACK TO THIS
                        },
                    ],
                },
            },
            // the below are copied from `joel_test-role-927gtd4h`:
            {
                name: `${roleName}_DescribePolicy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        { Effect: "Allow", Action: "ec2:Describe*", Resource: "*" },
                        {
                            Effect: "Allow",
                            Action: "elasticloadbalancing:Describe*",
                            Resource: "*",
                        },
                        {
                            Effect: "Allow",
                            Action: [
                                "cloudwatch:ListMetrics",
                                "cloudwatch:GetMetricStatistics",
                                "cloudwatch:Describe*",
                            ],
                            Resource: "*",
                        },
                        { Effect: "Allow", Action: "autoscaling:Describe*", Resource: "*" },
                    ],
                },
            },
            {
                name: `${roleName}_S3Policy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: ["s3:*", "s3-object-lambda:*"],
                            Resource: "*",
                        },
                    ],
                },
            },
            {
                name: `${roleName}_MiscPolicy`,
                document: {
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
                            Resource: "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
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
                            Resource: "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
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
                },
            },
            {
                name: `${roleName}_LogPolicy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: "logs:CreateLogGroup",
                            Resource: "arn:aws:logs:us-east-1:536697269866:*",
                        },
                        {
                            Effect: "Allow",
                            Action: ["logs:CreateLogStream", "logs:PutLogEvents"],
                            Resource: [
                                "arn:aws:logs:us-east-1:536697269866:log-group:/aws/lambda/joel_test:*",
                            ],
                        },
                    ],
                },
            },
            {
                name: `${roleName}_BasePermissionsPolicy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Sid: "BasePermissions",
                            Effect: "Allow",
                            Action: [
                                "secretsmanager:*",
                                "cloudformation:CreateChangeSet",
                                "cloudformation:DescribeChangeSet",
                                "cloudformation:DescribeStackResource",
                                "cloudformation:DescribeStacks",
                                "cloudformation:ExecuteChangeSet",
                                "docdb-elastic:GetCluster",
                                "docdb-elastic:ListClusters",
                                "ec2:DescribeSecurityGroups",
                                "ec2:DescribeSubnets",
                                "ec2:DescribeVpcs",
                                "kms:DescribeKey",
                                "kms:ListAliases",
                                "kms:ListKeys",
                                "lambda:ListFunctions",
                                "rds:DescribeDBClusters",
                                "rds:DescribeDBInstances",
                                "redshift:DescribeClusters",
                                "redshift-serverless:ListWorkgroups",
                                "redshift-serverless:GetNamespace",
                                "tag:GetResources",
                            ],
                            Resource: "*",
                        },
                        {
                            Sid: "LambdaPermissions",
                            Effect: "Allow",
                            Action: [
                                "lambda:AddPermission",
                                "lambda:CreateFunction",
                                "lambda:GetFunction",
                                "lambda:InvokeFunction",
                                "lambda:UpdateFunctionConfiguration",
                            ],
                            Resource: "arn:aws:lambda:*:*:function:SecretsManager*",
                        },
                        {
                            Sid: "SARPermissions",
                            Effect: "Allow",
                            Action: [
                                "serverlessrepo:CreateCloudFormationChangeSet",
                                "serverlessrepo:GetApplication",
                            ],
                            Resource: "arn:aws:serverlessrepo:*:*:applications/SecretsManager*",
                        },
                        {
                            Sid: "S3Permissions",
                            Effect: "Allow",
                            Action: ["s3:GetObject"],
                            Resource: [
                                "arn:aws:s3:::awsserverlessrepo-changesets*",
                                "arn:aws:s3:::secrets-manager-rotation-apps-*/*",
                            ],
                        },
                    ],
                },
            },
            {
                name: `${roleName}_StartInstancesPolicy`,
                document: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Sid: "VisualEditor0",
                            Effect: "Allow",
                            Action: "ec2:StartInstances",
                            Resource: "*",
                        },
                    ],
                },
            },
        ];
        yield Promise.all(policies.map((policy) => iamClient.send(new client_iam_1.PutRolePolicyCommand({
            RoleName: roleName,
            PolicyName: policy.name,
            PolicyDocument: JSON.stringify(policy.document),
        }))));
        console.log("✅ Attached policies to role");
    });
}
function roleExistsAndIsAssumable(roleName) {
    return __awaiter(this, void 0, void 0, function* () {
        const waitResult = yield (0, client_iam_1.waitUntilRoleExists)({ client: iamClient, maxWaitTime: 120, minDelay: 5 }, { RoleName: roleName });
        if (`${waitResult.state}` !== "SUCCESS") {
            return false;
        }
        try {
            const assumedRole = yield stsClient.send(new client_sts_1.AssumeRoleCommand({
                RoleArn: `arn:aws:iam::${configHarrier_1.configHarrier.awsAccountId}:role/${roleName}`,
                RoleSessionName: "TestSession",
            }));
            return !!assumedRole.Credentials;
        }
        catch (error) {
            console.error("Error assuming role: ", error);
            return false;
        }
    });
}
function createWorkflowLambdaServiceRole(roleName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingRoleArn = yield checkIfRoleExists(roleName);
            if (existingRoleArn) {
                console.log(`Role ${roleName} already exists, skipping creation...`);
                return existingRoleArn;
            }
            const arn = yield createRole(roleName);
            yield attachPolicies(roleName);
            if (!(yield roleExistsAndIsAssumable(roleName))) {
                throw new Error("Role is not assumable");
            }
            console.log(`✅ Created role ${roleName}`);
            return arn;
        }
        catch (error) {
            console.error("Error in createWorkflowLambdaServiceRole: ", error);
            throw error;
        }
    });
}
exports.default = createWorkflowLambdaServiceRole;
