import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  TagSpecification,
  _InstanceType,
} from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";
import { getStartScript } from "../../../scripts/setup";

export const createEC2 = async () => {
  const client = new EC2Client({ region: configHarrier.region });

  const amiId = configHarrier.imageId;
  const instanceType: _InstanceType =
    configHarrier.instanceType === "m7a.medium"
      ? configHarrier.instanceType
      : "t2.micro";
  const keyName = configHarrier.keyName;
  const minCount = configHarrier.minInstanceCount;
  const maxCount = configHarrier.maxInstanceCount;
  const securityGroupIds = configHarrier.securityGroupIds;
  const subnetId = configHarrier.subnetId;
  const iamInstanceProfile = configHarrier.IamInstanceProfile;
  const tagSpecifications: TagSpecification[] = [
    {
      ResourceType: "instance",
      Tags: [
        { Key: "Name", Value: `${configHarrier.tagValue}-ec2` },
        { Key: "Agent", Value: "Harrier-Runner" },
      ],
    },
  ];

  // const userDataScript = startScript;
  const userDataScript = getStartScript();
  // console.log(userDataScript);

  // Encode the script in base64 as required by AWS
  const userData = Buffer.from(userDataScript).toString("base64");

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

    console.log(`✅ Successfully created instance with ID: ${instanceId}\n`);
    return instanceId;
  } catch (error) {
    throw new Error(`Error creating EC2 instance: ${error}`);
  }
};
