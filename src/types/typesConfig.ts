import { _InstanceType } from "@aws-sdk/client-ec2";

export interface configHarrierType {
  logGroupName: string;
  tagValue: string;
  cidrBlockVPC: string;
  cidrBlockSubnet: string;
  subnetIds: string[];
  vpcId: string | undefined;
  subnetId: string | undefined;
  region: string;
  availabilityZone: string;
  awsAccountId: string;
  imageId: string; // AMI ID for the instance
  instanceType: _InstanceType; // EC2 instance type
  keyName: string;
  minInstanceCount: number; // Minimum instances to launch
  maxInstanceCount: number; // Maximum instances to launch
  securityGroupName: string;
  securityGroupIds: string[];
  githubUrl: string;
  s3Name: string;
  cacheTtlHours: string;
  secretName: string;
  ghOwnerName: string;
  // IamInstanceProfile: {
  //   Name: string;
  // };

  workflowLambdaName: string;
  timeoutLambdaName: string;
  evictionLambdaName: string;

  workflowServiceName: string;
  timeoutServiceName: string;
  cacheEvictionServiceName: string;
  runnerInstanceServiceName: string;
  runnerInstanceProfileName: string;
  schedulerServiceName: string;
  workflowServiceRoleArn: string;
  cacheEvictionServiceRoleArn: string;
  timeoutServiceRoleArn: string;
  runnerInstanceServiceRoleArn: string;
  schedulerServiceRoleArn: string;
  stageName: string;

  warmPoolSize: number;
  instanceIds: string[];

  harrierTagKey: string;
  harrierTagValue: string;
  ssmSendCommandTimeout: number;
  maxWaiterTimeInSeconds: number;
  timeoutLambdaDelayInMin: string;

  backupInstanceTypes: _InstanceType[];
}
