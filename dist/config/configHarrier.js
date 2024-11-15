"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResourcePolicyDocument = exports.evictionPolicyDocument = exports.harrierRestApi = exports.harrierLambda_Scheduler = exports.harrierLambda_Eviction = exports.harrierLambda_Workflow = exports.harrierS3 = exports.harrierEC2 = exports.harrierVPC = exports.configHarrier = void 0;
const installationHash_1 = require("./installationHash");
// import { getInput } from "@actions/core";
// const awsRegion = getInput("region");
// const ghOwnerName = getInput("ghOwnerName");
// const awsAccountId = getInput("awsAccountId");
// const instanceType = getInput("instanceType");
// const cacheTtlHours = getInput("cacheTtlHours");
// const cidrBlockVPC = getInput("cidrBlockVPC");
// const cidrBlockSubnet = getInput("cidrBlockSubnet");
const awsRegion = "us-east-1";
const ghOwnerName = "2408-capstone-team5";
const awsAccountId = "536697269866";
const instanceType = "t2.micro";
const cacheTtlHours = "72";
const cidrBlockVPC = "10.0.0.0/16";
const cidrBlockSubnet = "10.0.0.0/24";
exports.configHarrier = {
    vpcId: "",
    tagValue: `harrier-${installationHash_1.installationHash}`,
    cidrBlockVPC: cidrBlockVPC,
    cidrBlockSubnet: cidrBlockSubnet,
    subnetId: "",
    subnetIds: [],
    securityGroupIds: [],
    securityGroupName: "",
    logGroupName: "/aws/lambdas/__TEST_LOG_GROUP",
    //   logGroup: "/aws/lambda/joel_test",
    region: awsRegion,
    awsAccountId: awsAccountId,
    imageId: "ami-063d43db0594b521b",
    // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
    instanceType: instanceType,
    keyName: "test-1-ubuntu-64x86-241022",
    minInstanceCount: 1,
    maxInstanceCount: 1,
    IamInstanceProfile: {
        Name: "EC2-access-S3", // this will change as it is created programmatically
    },
    secretName: "github/pat/harrier",
    ghOwnerName: ghOwnerName,
    githubUrl: `https://github.com/${ghOwnerName}`,
    s3Name: `harrier-s3-${ghOwnerName}`,
    cacheTtlHours: cacheTtlHours,
    workflowServiceName: `harrier-${installationHash_1.installationHash}-workflow`,
    cacheEvictionServiceName: `harrier-${installationHash_1.installationHash}-eviction`,
    runnerInstanceServiceName: `harrier-${installationHash_1.installationHash}-runner`,
    schedulerServiceName: `harrier-${installationHash_1.installationHash}-scheduler`,
    workflowServiceRoleArn: "",
    cacheEvictionServiceRoleArn: "",
    runnerInstanceServiceRoleArn: "",
    schedulerServiceRoleArn: "",
    stageName: "dev",
};
exports.harrierVPC = {};
exports.harrierEC2 = {};
exports.harrierS3 = {};
exports.harrierLambda_Workflow = {};
exports.harrierLambda_Eviction = {};
exports.harrierLambda_Scheduler = {};
exports.harrierRestApi = {};
// export const workflowPolicyDocument = JSON.stringify({
//   Version: "2012-10-17",
//   Statement: [
//     {
//       Sid: "VisualEditor0",
//       Effect: "Allow",
//       Action: ["ec2:StartInstances", "ec2:StopInstances"],
//       Resource: `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
//       Condition: {
//         StringEquals: {
//           "ec2:ResourceTag/Agent": "Harrier-Runner",
//         },
//       },
//     },
//     {
//       Sid: "VisualEditor1",
//       Effect: "Allow",
//       Action: ["ssm:SendCommand", "logs:CreateLogGroup"],
//       Resource: [
//         `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
//         "arn:aws:ssm:*:*:document/AWS-RunShellScript",
//         `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*`,
//       ],
//     },
//     {
//       Sid: "VisualEditor2",
//       Effect: "Allow",
//       Action: [
//         "logs:CreateLogStream",
//         "s3:GetBucketTagging",
//         "secretsmanager:GetSecretValue",
//         "logs:PutLogEvents",
//       ],
//       Resource: [
//         "arn:aws:s3:::harrier*",
//         `arn:aws:secretsmanager:*:${configHarrier.awsAccountId}:secret:${configHarrier.secretName}*`,
//         `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*:log-stream:*`,
//       ],
//     },
//     {
//       Sid: "VisualEditor3",
//       Effect: "Allow",
//       Action: ["ec2:DescribeInstances", "s3:ListAllMyBuckets"],
//       Resource: "*",
//     },
//   ],
// });
exports.evictionPolicyDocument = JSON.stringify({});
exports.apiResourcePolicyDocument = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Principal: "*",
            Action: "execute-api:Invoke",
            Resource: `arn:aws:execute-api:${exports.configHarrier.region}:${exports.configHarrier.awsAccountId}:*/*`,
            Condition: {
                IpAddress: {
                    "aws:SourceIp": [
                        "192.30.252.0/22",
                        "185.199.108.0/22",
                        "140.82.112.0/20",
                        "143.55.64.0/20",
                        "2a0a:a440::/29",
                        "2606:50c0::/32",
                    ],
                },
            },
        },
    ],
});
// export const harrierWebhook = {};
