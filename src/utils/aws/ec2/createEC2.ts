import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  _InstanceType,
  IamInstanceProfileSpecification,
  TagSpecification,
} from "@aws-sdk/client-ec2";

export const createEC2 = async (
  client: EC2Client,
  amiId: string,
  instanceType: _InstanceType,
  minCount: number,
  maxCount: number,
  securityGroupIds: string[],
  subnetId: string,
  iamInstanceProfile: IamInstanceProfileSpecification,
  tagSpecifications: TagSpecification[],
  userData: string,
  keyName?: string
) => {
  // const isInstanceType = (value: string): value is _InstanceType {
  //   return validInstanceTypes.has(value as _InstanceType);
  // }

  const params: RunInstancesCommandInput = {
    ImageId: amiId, // AMI ID for the instance
    InstanceType: instanceType, // EC2 instance type
    KeyName: keyName,
    MinCount: minCount, // Minimum instances to launch
    MaxCount: maxCount, // Maximum instances to launch
    SecurityGroupIds: securityGroupIds, // Security group IDs
    SubnetId: subnetId, // Subnet ID (optional)
    IamInstanceProfile: iamInstanceProfile, // IAM resource profile
    TagSpecifications: tagSpecifications, // Instance tags
    UserData: userData, // UserData (must be base64 encoded)
  };

  const runInstancesCommand = new RunInstancesCommand(params);

  try {
    const instanceData = await client.send(runInstancesCommand);

    let instanceId = "";
    if (instanceData.Instances && instanceData.Instances[0].InstanceId) {
      instanceId = instanceData.Instances[0].InstanceId;
    }

    console.log(`Created instance with ID: ${instanceId}`);
  } catch (error) {
    console.error("Error creating EC2 instance: ", error);
  }
};
