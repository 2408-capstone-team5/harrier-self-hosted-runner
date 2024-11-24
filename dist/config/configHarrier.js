"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResourcePolicyDocument = exports.configHarrier = void 0;
const installationHash_1 = require("./installationHash");
const ec2InstancesType_1 = require("../types/ec2InstancesType");
const core_1 = require("@actions/core");
const DEFAULT_INSTANCE_TYPE = "m7a.medium"; //"m7a.xlarge";
const awsRegion = (0, core_1.getInput)("region") || "us-east-1";
const ghOwnerName = (0, core_1.getInput)("ghOwnerName") || "2408-capstone-team5";
const awsAccountId = (0, core_1.getInput)("awsAccountId") || "536697269866";
const possibleInstanceType = (0, ec2InstancesType_1.toInstanceType)((0, core_1.getInput)("instanceType"));
const instanceType = possibleInstanceType
    ? possibleInstanceType
    : DEFAULT_INSTANCE_TYPE;
console.log(`Using instanceType: ${instanceType}`);
const cacheTtlHours = (0, core_1.getInput)("cacheTtlHours") || "72";
const cidrBlockVPC = (0, core_1.getInput)("cidrBlockVPC") || "10.0.0.0/16";
const cidrBlockSubnet = (0, core_1.getInput)("cidrBlockSubnet") || "10.0.0.0/24";
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
    // imageId: "ami-063d43db0594b521b", // AMI ID for Amazon Linux
    imageId: "ami-005fc0f236362e99f",
    // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
    instanceType: instanceType,
    keyName: "test-1-ubuntu-64x86-241022",
    minInstanceCount: 1,
    maxInstanceCount: 1,
    IamInstanceProfile: {
        Name: "EC2-access-S3", // this will change as it is created programmatically
    },
    ghOwnerName: ghOwnerName,
    githubUrl: `https://github.com/${ghOwnerName}`,
    s3Name: `harrier-s3-${ghOwnerName}`,
    cacheTtlHours: cacheTtlHours,
    workflowLambdaName: `harrier-${installationHash_1.installationHash}-workflow`,
    timeoutLambdaName: `harrier-${installationHash_1.installationHash}-timeout`,
    evictionLambdaName: `harrier-${installationHash_1.installationHash}-eviction`,
    workflowServiceName: `harrier-${installationHash_1.installationHash}-workflow`,
    timeoutServiceName: `harrier-${installationHash_1.installationHash}-timeout`,
    cacheEvictionServiceName: `harrier-${installationHash_1.installationHash}-eviction`,
    runnerInstanceServiceName: `harrier-${installationHash_1.installationHash}-runner`,
    schedulerServiceName: `harrier-${installationHash_1.installationHash}-scheduler`,
    workflowServiceRoleArn: "",
    cacheEvictionServiceRoleArn: "",
    timeoutServiceRoleArn: "",
    runnerInstanceServiceRoleArn: "",
    schedulerServiceRoleArn: "",
    stageName: "dev",
    warmPoolSize: 8,
    instanceIds: [],
    // all currently used by the workflow lambda:
    secretName: "github/pat/harrier",
    harrierTagKey: "Agent",
    harrierTagValue: "Harrier-Runner",
    ssmSendCommandTimeout: 100,
    maxWaiterTimeInSeconds: 60 * 4,
};
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
