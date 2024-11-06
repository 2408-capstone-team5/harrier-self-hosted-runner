/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  // _InstanceType,
  // IamInstanceProfileSpecification,
  TagSpecification,
} from "@aws-sdk/client-ec2";
import { config } from "../../../config/client";
// import { configHarrierType } from "../../../types/typesConfig";
import { configHarrier } from "../../../config/configHarrier";
// import { validInstanceTypes } from "../../../types/ec2InstancesType";
import { getStartScript } from "../../../scripts/setup";

// import { fromIni } from "@aws-sdk/credential-provider-ini"; // For loading credentials from ~/.aws/credentials

// const REGION = "us-east-1"; // Change to your desired region

// // Initialize the EC2 client
// const client = new EC2Client({
//   region: REGION,
//   credentials: fromIni({ profile: "default" }), // Load credentials from the default profile
// });

export const createEC2 = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const client = new EC2Client(config);
  const url = "https://github.com/2408-capstone-team5";

  // const instanceType = "t2.micro";
  // use configHarrier to assign config values to RunInstancesCommand params

  // function isConfigHarrier(obj: configHarrierType): obj is configHarrierType {
  //   return obj && typeof obj.tagValue === 'string' && typeof obj.cidrBlockVPC === 'string' && typeof obj.cidrBlockSubnet === 'string' && obj.vpcId === 'string' && obj.subnetId === 'string' && obj.region === 'string' && obj.awsAccountId === 'string' && obj.imageId === 'string' && obj.instanceType === 'string' && obj.keyName === 'string' && obj.minInstanceCount === 'number' && obj.maxInstanceCount === 'number' && obj.IamInstanceProfile === 'object';
  // };

  const amiId = configHarrier.imageId;
  const instanceType = "t2.micro";
  const keyName = "test-1-ubuntu-64x86-241022";
  const minCount = 1;
  const maxCount = 1;
  const securityGroupIds = ["sg-0f690732e685b371b"];
  const subnetId = "subnet-0a0ad1280d9d29dd0";
  const iamInstanceProfile = { Name: "EC2-access-S3" };
  const tagSpecifications: TagSpecification[] = [
    {
      ResourceType: "instance",
      Tags: [{ Key: "Name", Value: configHarrier.tagValue }], // Tagging your instance
    },
  ];

  // const userDataScript = startScript;
  const userDataScript = getStartScript(url);
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
