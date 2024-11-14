"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harrierRestApi = exports.harrierLambda_Scheduler = exports.harrierLambda_Cleanup = exports.harrierLambda_Workflow = exports.harrierS3 = exports.harrierEC2 = exports.harrierVPC = exports.cleanupPolicyDocument = exports.workflowPolicyDocument = exports.configHarrier = void 0;
const installationHash_1 = require("./installationHash");
exports.configHarrier = {
    vpcId: "",
    tagValue: `Harrier-${installationHash_1.installationHash}`,
    cidrBlockVPC: "10.0.0.0/16",
    cidrBlockSubnet: "10.0.0.0/24",
    subnetId: "",
    subnetIds: [],
    securityGroupIds: [],
    securityGroupName: "",
    logGroup: "/aws/lambda/joel_test",
    workflowLambdaLogGroup: "joel_test",
    region: "us-east-1",
    awsAccountId: "536697269866",
    imageId: "ami-063d43db0594b521b",
    // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
    instanceType: "t2.micro",
    keyName: "test-1-ubuntu-64x86-241022",
    minInstanceCount: 1,
    maxInstanceCount: 1,
    //   IamInstanceProfile: {
    //     Name: "ec2-service-role", // was EC2AccessS3
    //   },
    githubUrl: "https://github.com/2408-capstone-team5",
    secretName: "github/pat/harrier",
    s3Name: "",
    org: "2408-capstone-team5",
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
