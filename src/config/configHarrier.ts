import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";
import { _InstanceType } from "@aws-sdk/client-ec2";
import { toInstanceType } from "../types/ec2InstancesType";
import { getInput } from "@actions/core";

const DEFAULT_INSTANCE_TYPE: _InstanceType = "m7a.medium";
// const DEFAULT_INSTANCE_TYPE: _InstanceType = "hpc6id.32xlarge";  // not in us-east-1, for testing

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
const cleanOnly = getInput("cleanOnly") || "false";

export const configHarrier: configHarrierType = {
  vpcId: "",
  tagValue: `harrier-${installationHash}`, // modified from capital H
  cidrBlockVPC: cidrBlockVPC,
  cidrBlockSubnet: cidrBlockSubnet,
  cleanOnly: cleanOnly,

  subnetId: "",
  subnetIds: [],
  securityGroupIds: [],
  securityGroupName: "",
  logGroupName: "/aws/lambdas/__TEST_LOG_GROUP",
  //   logGroup: "/aws/lambda/joel_test",
  region: awsRegion,
  availabilityZone: "",
  awsAccountId: awsAccountId,
  // imageId: "ami-063d43db0594b521b", // AMI ID for Amazon Linux
  imageId: "ami-005fc0f236362e99f", // AMI Ubuntu 22.04
  // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
  instanceType: instanceType, // EC2 instance type used for initial EC2 cold-start
  // keyName: "test-1-ubuntu-64x86-241022", // dev only for SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  // IamInstanceProfile: {
  //   Name: "EC2-access-S3", // this will change as it is created programmatically
  // },
  ghOwnerName: ghOwnerName,
  githubUrl: `https://github.com/${ghOwnerName}`,
  s3Name: `harrier-s3-${ghOwnerName}`,
  cacheTtlHours: cacheTtlHours,

  workflowLambdaName: `harrier-${installationHash}-workflow`, // these are LAMBDA names
  timeoutLambdaName: `harrier-${installationHash}-timeout`,
  evictionLambdaName: `harrier-${installationHash}-eviction`,

  workflowServiceName: `harrier-${installationHash}-workflow-service-role`, // these are service ROLE names
  cacheEvictionServiceName: `harrier-${installationHash}-eviction-service-role`,
  timeoutServiceName: `harrier-${installationHash}-timeout-service-role`,
  runnerInstanceServiceName: `harrier-${installationHash}-runner-service-role`,
  schedulerServiceName: `harrier-${installationHash}-scheduler-service-role`,

  runnerInstanceProfileName: `harrier-${installationHash}-runner-instance-profile`,

  workflowServiceRoleArn: "",
  cacheEvictionServiceRoleArn: "",
  timeoutServiceRoleArn: "",
  runnerInstanceServiceRoleArn: "",
  schedulerServiceRoleArn: "",

  stageName: "dev",

  warmPoolSize: 2,
  instanceIds: [],

  // all currently used by the workflow lambda:
  secretName: "github/pat/harrier",
  harrierTagKey: "Agent",
  harrierTagValue: "Harrier-Runner",
  ssmSendCommandTimeout: 100,
  maxWaiterTimeInSeconds: 60 * 4,
  timeoutLambdaDelayInMin: "1",

  backupInstanceTypes: [
    "m7a.large",
    "m7i.large",
    "r7a.medium",
    "m6a.large",
    "m6i.large",
    "m5a.large",
    "r6a.large",
    "r5a.large",
    "r6i.large",
    "m7a.medium",
    "t2.micro",
  ],
};

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
