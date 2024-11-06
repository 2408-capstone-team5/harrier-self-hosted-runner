import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

export const configHarrier: configHarrierType = {
  tagValue: `Harrier-${installationHash}`,
  cidrBlockVPC: "10.0.0.0/16",
  cidrBlockSubnet: "10.0.0.0/24",
  vpcId: "",
  subnetId: "",
  region: "us-east-1",
  awsAccountId: "536697269866",
  imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance
  instanceType: "t2.micro", // EC2 instance type
  keyName: "test-1-ubuntu-64x86-241022", // For SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  IamInstanceProfile: {
    Name: "EC2-access-S3",
  },
  securityGroupIds: ["sg-0f690732e685b371b"],
  githubUrl: "https://github.com/2408-capstone-team5",
};
