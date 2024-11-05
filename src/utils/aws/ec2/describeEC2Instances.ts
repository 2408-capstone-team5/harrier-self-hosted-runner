import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

export const describeEC2s = async (
  client: EC2Client,
  instanceIds: string[]
) => {
  const params = { InstanceIds: instanceIds };
  const describeInstancesCommand = new DescribeInstancesCommand(params);

  const instanceDetails = await ec2Client.send(describeInstancesCommand);

  if (
    instanceDetails &&
    instanceDetails.Reservations &&
    instanceDetails.Reservations[0].Instances
  ) {
    console.log(
      "Instance details:",
      instanceDetails.Reservations[0].Instances[0]
    );
  }
};
