import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

export const describeEC2s = async (instanceId: string) => {
  const ec2Client = new EC2Client({ region: "us-east-1" });

  const params = { InstanceIds: [instanceId] };
  const describeInstancesCommand = new DescribeInstancesCommand(params);

  const instanceDetails = await ec2Client.send(describeInstancesCommand);

  if (
    instanceDetails?.Reservations &&
    instanceDetails.Reservations[0].Instances
  ) {
    console.log(
      "Instance details:",
      instanceDetails.Reservations[0].Instances[0]
    );
  }
};
