import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

import { getInput } from "@actions/core";

const awsRegion = getInput("region") || "us-east-1";
const ghOwnerName = getInput("ghOwnerName") || "2408-capstone-team5";
const awsAccountId = getInput("awsAccountId") || "536697269866";
const instanceType = getInput("instanceType") || "t2.micro";
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
  imageId: "ami-063d43db0594b521b", // AMI ID for the instance
  // imageId: "ami-0866a3c8686eaeeba", // AMI ID for the instance - THIS IS FOR UBUNTU
  instanceType: instanceType, // EC2 instance type, default from workflow is t2.micro
  keyName: "test-1-ubuntu-64x86-241022", // For SSH access
  minInstanceCount: 1, // Minimum instances to launch
  maxInstanceCount: 1, // Maximum instances to launch
  IamInstanceProfile: {
    Name: "EC2-access-S3", // this will change as it is created programmatically
  },
  secretName: "github/pat/harrier", // githubPAT
  ghOwnerName: ghOwnerName,
  githubUrl: `https://github.com/${ghOwnerName}`,
  s3Name: `harrier-s3-${ghOwnerName}`,
  cacheTtlHours: cacheTtlHours,
  workflowServiceName: `harrier-${installationHash}-workflow`,
  cacheEvictionServiceName: `harrier-${installationHash}-eviction`,
  runnerInstanceServiceName: `harrier-${installationHash}-runner`,
  schedulerServiceName: `harrier-${installationHash}-scheduler`,
  workflowServiceRoleArn: "",
  cacheEvictionServiceRoleArn: "",
  runnerInstanceServiceRoleArn: "",
  schedulerServiceRoleArn: "",
  stageName: "dev",
};

export const harrierVPC = {};
export const harrierEC2 = {};
export const harrierS3 = {};

export const harrierLambda_Workflow = {};
export const harrierLambda_Eviction = {};
export const harrierLambda_Scheduler = {};
export const harrierRestApi = {};

// export const workflowPolicyDocument = JSON.stringify({
//   Version: "2012-10-17",
//   Statement: [
//     {
//       Sid: "VisualEditor0",
//       Effect: "Allow",
//       Action: ["ec2:StartInstances", "ec2:StopInstances"],
//       Resource: `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
//       Condition: {
//         StringEquals: {
//           "ec2:ResourceTag/Agent": "Harrier-Runner",
//         },
//       },
//     },
//     {
//       Sid: "VisualEditor1",
//       Effect: "Allow",
//       Action: ["ssm:SendCommand", "logs:CreateLogGroup"],
//       Resource: [
//         `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
//         "arn:aws:ssm:*:*:document/AWS-RunShellScript",
//         `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*`,
//       ],
//     },
//     {
//       Sid: "VisualEditor2",
//       Effect: "Allow",
//       Action: [
//         "logs:CreateLogStream",
//         "s3:GetBucketTagging",
//         "secretsmanager:GetSecretValue",
//         "logs:PutLogEvents",
//       ],
//       Resource: [
//         "arn:aws:s3:::harrier*",
//         `arn:aws:secretsmanager:*:${configHarrier.awsAccountId}:secret:${configHarrier.secretName}*`,
//         `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*:log-stream:*`,
//       ],
//     },
//     {
//       Sid: "VisualEditor3",
//       Effect: "Allow",
//       Action: ["ec2:DescribeInstances", "s3:ListAllMyBuckets"],
//       Resource: "*",
//     },
//   ],
// });

export const evictionPolicyDocument = JSON.stringify({});
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
// export const harrierWebhook = {};
