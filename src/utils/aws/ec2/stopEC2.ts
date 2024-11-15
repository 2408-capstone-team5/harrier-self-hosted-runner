import { EC2Client, StopInstancesCommand } from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";

export const stopInstance = async (instanceId: string) => {
  try {
    const ec2Client = new EC2Client({ region: configHarrier.region });
    const command = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const response = await ec2Client.send(command);
    console.log("   Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
};
