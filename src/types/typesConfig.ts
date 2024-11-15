export interface configHarrierType {
  logGroupName: string;
  tagValue: string;
  cidrBlockVPC: string;
  cidrBlockSubnet: string;
  subnetIds: string[];
  vpcId: string | undefined;
  subnetId: string | undefined;
  region: string;
  awsAccountId: string;
  imageId: string; // AMI ID for the instance
  instanceType: string; // EC2 instance type
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
  IamInstanceProfile: {
    Name: string;
  };
  workflowServiceName: string;
  cacheEvictionServiceName: string;
  runnerInstanceServiceName: string;
  schedulerServiceName: string;
  workflowServiceRoleArn: string;
  cacheEvictionServiceRoleArn: string;
  runnerInstanceServiceRoleArn: string;
  schedulerServiceRoleArn: string;
  stageName: string;
}
