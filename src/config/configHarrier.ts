import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

import { getInput } from "@actions/core";

const awsRegion = getInput("region");
const ghOwnerName = getInput("ghOwnerName");
const awsAccountId = getInput("awsAccountId");
const instanceType = getInput("instanceType");
const cacheTtlHours = getInput("cacheTtlHours");
const cidrBlockVPC = getInput("cidrBlockVPC");
const cidrBlockSubnet = getInput("cidrBlockSubnet");

// const awsRegion = "us-east-1";
// const ghOwnerName = "2408-capstone-team5";
// const awsAccountId = "536697269866";
// const instanceType = "t2.micro";
// const cacheTtlHours = 72;
// const cidrBlockVPC = "10.0.0.0/16";
// const cidrBlockSubnet = "10.0.0.0/24";

export const configHarrier: configHarrierType = {
  vpcId: "",
  tagValue: `Harrier-${installationHash}`,
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
  imageId: "ami-063d43db0594b521b", // AMI ID for the instance
  // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
  instanceType: instanceType, // EC2 instance type, default from workflow is t2.micro
  keyName: "test-1-ubuntu-64x86-241022", // For SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  IamInstanceProfile: {
    Name: "EC2-access-S3",
  },

  githubUrl: `https://github.com/${ghOwnerName}`,
  s3Name: `harrier-s3-${ghOwnerName}`,
  cacheTtlHours: cacheTtlHours,
};

export const harrierVPC = {};
export const harrierEC2 = {};
export const harrierS3 = {};

export const harrierLambda_Workflow = {};
export const harrierLambda_Cleanup = {};
export const harrierLambda_Scheduler = {};
export const harrierRestApi = {};

// export const harrierWebhook = {};
