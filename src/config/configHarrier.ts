// import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

export const configHarrier = {
  vpcId: "vpc-0fbd852ef128f5792",
  tagValue: `Harrier-${installationHash}`,
  cidrBlockVPC: "10.0.0.0/16",
  cidrBlockSubnet: "10.0.0.0/24",

  // m391jwyf

  subnetId: "subnet-04c3e15bb937304b2", // J
  subnetIds: ["subnet-04c3e15bb937304b2"], // J
  securityGroupIds: ["sg-0c2f583db167aef55", "sg-0fa85c6e2408628e4"], // J [default, harrier-m391jwyf-sg]
  workflowLambdaLogGroup: "joel_test", // J
  securityGroupName: "harrier-m391jwyf-sg", // J
  logGroup: "/aws/lambda/joel_test", // J

  region: "us-east-1",
  awsAccountId: "536697269866",
  imageId: "ami-063d43db0594b521b", // AMI ID for the instance
  // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
  instanceType: "t2.micro", // EC2 instance type
  keyName: "test-1-ubuntu-64x86-241022", // For SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  IamInstanceProfile: {
    Name: "EC2-access-S3",
  },

  githubUrl: "https://github.com/2408-capstone-team5",
  s3Name: "",
};

export const harrierVPC = {};
export const harrierEC2 = {};
export const harrierS3 = {};

export const harrierLambda_Workflow = {};
export const harrierLambda_Cleanup = {};
export const harrierLambda_Scheduler = {};
export const harrierRestApi = {};

// export const harrierWebhook = {};
