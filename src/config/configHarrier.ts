import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";
import { _InstanceType } from "@aws-sdk/client-ec2";
import { toInstanceType } from "../types/ec2InstancesType";
import { getInput } from "@actions/core";

const DEFAULT_INSTANCE_TYPE: _InstanceType = "m7a.xlarge";

const awsRegion = getInput("region") || "us-east-1";
const ghOwnerName = getInput("ghOwnerName") || "2408-capstone-team5";
const awsAccountId = getInput("awsAccountId") || "536697269866";

const possibleInstanceType = toInstanceType(getInput("instanceType"));
const instanceType = possibleInstanceType
  ? possibleInstanceType
  : DEFAULT_INSTANCE_TYPE;

console.log(`Using instanceType: ${instanceType}`);

const cacheTtlHours = getInput("cacheTtlHours") || "72";
const cidrBlockVPC = getInput("cidrBlockVPC") || "10.0.0.0/16";
const cidrBlockSubnet = getInput("cidrBlockSubnet") || "10.0.0.0/24";

export const configHarrier: configHarrierType = {
  vpcId: "",
  tagValue: `harrier-${installationHash}`, // modified from capital H
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
  imageId: "ami-005fc0f236362e99f", // AMI Ubuntu 22.04
  // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
  instanceType: instanceType, // EC2 instance type, default from workflow is t2.micro
  keyName: "test-1-ubuntu-64x86-241022", // For SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  IamInstanceProfile: {
    Name: "EC2-access-S3", // this will change as it is created programmatically
  },
  ghOwnerName: ghOwnerName,
  githubUrl: `https://github.com/${ghOwnerName}`,
  s3Name: `harrier-s3-${ghOwnerName}`,
  cacheTtlHours: cacheTtlHours,
  workflowServiceName: `harrier-${installationHash}-workflow`,
  timeoutServiceName: `harrier-${installationHash}-timeout`,
  cacheEvictionServiceName: `harrier-${installationHash}-eviction`,
  runnerInstanceServiceName: `harrier-${installationHash}-runner`,
  schedulerServiceName: `harrier-${installationHash}-scheduler`,
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

export const harrierVPC = {};
export const harrierEC2 = {};
export const harrierS3 = {};

export const harrierLambda_Workflow = {};
export const harrierLambda_Eviction = {};
export const harrierLambda_Scheduler = {};
export const harrierRestApi = {};

export const apiResourcePolicyDocument = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: "*",
      Action: "execute-api:Invoke",
      Resource: `arn:aws:execute-api:${configHarrier.region}:${configHarrier.awsAccountId}:*/*`,
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
