import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  TagSpecification,
} from "@aws-sdk/client-ec2";
import { config } from "../../../config/client";
import { configHarrier } from "../../../config/configHarrier";
import { getStartScript } from "../../../scripts/setup";

export const createEC2 = async () => {
  const client = new EC2Client(config);
  const githubUrl = "https://github.com/2408-capstone-team5";

  const amiId = configHarrier.imageId;
  const instanceType =
    configHarrier.instanceType === "m7a.medium"
      ? configHarrier.instanceType
      : "t2.micro";
  const keyName = configHarrier.keyName;
  const minCount = configHarrier.minInstanceCount;
  const maxCount = configHarrier.maxInstanceCount;
  const securityGroupIds = ["sg-0f690732e685b371b"]; // We need security groups in configHarrier
  const subnetId = configHarrier.subnetId;
  const iamInstanceProfile = configHarrier.IamInstanceProfile;
  const tagSpecifications: TagSpecification[] = [
    {
      ResourceType: "instance",
      Tags: [{ Key: "Name", Value: configHarrier.tagValue }], // Tagging your instance
    },
  ];

  // const userDataScript = startScript;
  const userDataScript = getStartScript(githubUrl);
  console.log(userDataScript);

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

    console.log(`Created instance with ID: ${instanceId}`);
  } catch (error) {
    console.error("Error creating EC2 instance: ", error);
  }
};
