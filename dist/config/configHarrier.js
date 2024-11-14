"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harrierRestApi = exports.harrierLambda_Scheduler = exports.harrierLambda_Cleanup = exports.harrierLambda_Workflow = exports.harrierS3 = exports.harrierEC2 = exports.harrierVPC = exports.cleanupPolicyDocument = exports.workflowPolicyDocument = exports.configHarrier = void 0;
const installationHash_1 = require("./installationHash");
const core_1 = require("@actions/core");
const awsRegion = (0, core_1.getInput)("region");
const ghOwnerName = (0, core_1.getInput)("ghOwnerName");
const awsAccountId = (0, core_1.getInput)("awsAccountId");
const instanceType = (0, core_1.getInput)("instanceType");
const cacheTtlHours = (0, core_1.getInput)("cacheTtlHours");
const cidrBlockVPC = (0, core_1.getInput)("cidrBlockVPC");
const cidrBlockSubnet = (0, core_1.getInput)("cidrBlockSubnet");
// const awsRegion = "us-east-1";
// const ghOwnerName = "2408-capstone-team5";
// const awsAccountId = "536697269866";
// const instanceType = "t2.micro";
// const cacheTtlHours = 72;
// const cidrBlockVPC = "10.0.0.0/16";
// const cidrBlockSubnet = "10.0.0.0/24";
exports.configHarrier = {
    vpcId: "",
    tagValue: `Harrier-${installationHash_1.installationHash}`,
    cidrBlockVPC: cidrBlockVPC,
    cidrBlockSubnet: cidrBlockSubnet,
    subnetId: "",
    subnetIds: [],
    securityGroupIds: [],
    securityGroupName: "",
    /*
      I'm wondering if we want a SINGLE log group for all logging?
      
      Note: each time a lambda is created, a default '/aws/lambda/<lambda-name>' gets created
  
      there's definite tradeoffs and sifting through multiple log streams is a pain imo but having ALL logs
      in once place might be a little overwhelming...
    */
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

    secretName: "github/pat/harrier",
    IamInstanceProfile: {
        Name: "EC2-access-S3",
    },
    githubUrl: `https://github.com/${ghOwnerName}`,
    s3Name: `harrier-s3-${ghOwnerName}`,
    cacheTtlHours: cacheTtlHours,

};
exports.workflowPolicyDocument = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "VisualEditor0",
            Effect: "Allow",
            Action: ["ec2:StartInstances", "ec2:StopInstances"],
            Resource: `arn:aws:ec2:*:${exports.configHarrier.awsAccountId}:instance/*`,
            Condition: {
                StringEquals: {
                    "ec2:ResourceTag/Agent": "Harrier-Runner",
                },
            },
        },
        {
            Sid: "VisualEditor1",
            Effect: "Allow",
            Action: ["ssm:SendCommand", "logs:CreateLogGroup"],
            Resource: [
                `arn:aws:ec2:*:${exports.configHarrier.awsAccountId}:instance/*`,
                "arn:aws:ssm:*:*:document/AWS-RunShellScript",
                `arn:aws:logs:*:${exports.configHarrier.awsAccountId}:log-group:*`,
            ],
        },
        {
            Sid: "VisualEditor2",
            Effect: "Allow",
            Action: [
                "logs:CreateLogStream",
                "s3:GetBucketTagging",
                "secretsmanager:GetSecretValue",
                "logs:PutLogEvents",
            ],
            Resource: [
                "arn:aws:s3:::harrier*",
                `arn:aws:secretsmanager:*:${exports.configHarrier.awsAccountId}:secret:${exports.configHarrier.secretName}*`,
                `arn:aws:logs:*:${exports.configHarrier.awsAccountId}:log-group:*:log-stream:*`,
            ],
        },
        {
            Sid: "VisualEditor3",
            Effect: "Allow",
            Action: ["ec2:DescribeInstances", "s3:ListAllMyBuckets"],
            Resource: "*",
        },
    ],
});
exports.cleanupPolicyDocument = JSON.stringify({});
exports.harrierVPC = {};
exports.harrierEC2 = {};
exports.harrierS3 = {};
exports.harrierLambda_Workflow = {};
exports.harrierLambda_Cleanup = {};
exports.harrierLambda_Scheduler = {};
exports.harrierRestApi = {};
// export const harrierWebhook = {};
