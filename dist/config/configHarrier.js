"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harrierRestApi = exports.harrierLambda_Scheduler = exports.harrierLambda_Cleanup = exports.harrierLambda_Workflow = exports.harrierS3 = exports.harrierEC2 = exports.harrierVPC = exports.configHarrier = void 0;
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
    /*
      I'm wondering if we want a SINGLE log group for all logging?
      
      Note: each time a lambda is created, a default '/aws/lambda/<lambda-name>' gets created
  
      there's definite tradeoffs and sifting through multiple log streams is a pain imo but having ALL logs
      in once place might be a little overwhelming...
    */
    logGroupName: "/aws/lambdas/__TEST_LOG_GROUP",
    //   logGroup: "/aws/lambda/joel_test",
    region: "us-east-1",
    awsAccountId: "536697269866",
    imageId: "ami-063d43db0594b521b",
    // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
    instanceType: "t2.micro",
    keyName: "test-1-ubuntu-64x86-241022",
    minInstanceCount: 1,
    maxInstanceCount: 1,
    IamInstanceProfile: {
        Name: "EC2-access-S3",
    },
    githubUrl: "https://github.com/2408-capstone-team5",
    s3Name: "",
};
exports.harrierVPC = {};
exports.harrierEC2 = {};
exports.harrierS3 = {};
exports.harrierLambda_Workflow = {};
exports.harrierLambda_Cleanup = {};
exports.harrierLambda_Scheduler = {};
exports.harrierRestApi = {};
// export const harrierWebhook = {};
