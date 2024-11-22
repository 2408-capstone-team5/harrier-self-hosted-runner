import { EC2Client, StopInstancesCommand } from "@aws-sdk/client-ec2";
const REGION = process.env.AWS_REGION;

const ec2Client = new EC2Client({ region: REGION });
async function stopInstance(instanceId) {
  try {
    const stop = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const response = await ec2Client.send(stop);
    console.log("✅ Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
}

export const handler = async (event) => {
    
};
