import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

export const configHarrier: configHarrierType = {
  tagValue: `Harrier-${installationHash}`,
  cidrBlockVPC: "10.0.0.0/16",
  cidrBlockSubnet: "10.0.0.0/24",
  vpcId: "vpc-03bb0ff49f91073a1", //
  subnetId: "subnet-091b52fd4ce191245", // @SHANE i just copied this from the console, it's the only public subnet id that I saw for 'harrier-vpc'
  subnetIds: ["subnet-091b52fd4ce191245"], // required for CreateFunctionCommand's input
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
  securityGroupIds: ["sg-0f690732e685b371b"], // from what I saw, this one doesn't seem to be associated with the harrier-vpc
  // @SHANE I also saw these associated with the harrier-vpc: 'sg-068b3391ebd88e4a5', 'sg-02c838fe0acc3bb91', and 'sg-03cba7df50bc7df7a'
  // these security groups will need to be created programmatically anyway so the specifics don't matter
  // TODO: programmatically create security groups
  securityGroupName: "",
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
