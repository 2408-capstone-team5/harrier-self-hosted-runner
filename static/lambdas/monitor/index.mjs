import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { EC2Client, StopInstancesCommand } from "@aws-sdk/client-ec2";

const [s3Client, ec2Client] = [S3Client, EC2Client].map(
  (client) => new client({ region: REGION })
);

const BUCKET_NAME = "ec2-instance-status";

export const handler = async () => {
  console.log("Polling Lambda invoked");

  const now = Date.now();
  const list = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
  const objects = await s3Client.send(list);

  if (!objects.Contents) {
    console.log("No instances to check.");
    return;
  }

  for (const object of objects.Contents) {
    const key = object.Key;

    try {
      // Fetch instance state
      const getObject = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
      const stateObject = await s3Client.send(getObject);
      const state = JSON.parse(await streamToString(stateObject.Body));

      if (state.TimerExpiration < now && state.Status === "running") {
        const instanceId = key.replace(".json", "");
        console.log(`Stopping expired instance: ${instanceId}`);

        // Stop the EC2 instance
        const stop = new StopInstancesCommand({ InstanceIds: [instanceId] });
        await ec2Client.send(stop);

        // Update state in S3
        state.Status = "stopped";
        const put = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: JSON.stringify(state),
        });

        await s3Client.send(put);
        console.log(`✅ Updated state for instance ${instanceId}:`, state);
      }
    } catch (error) {
      console.error(`Error processing ${key}:`, error);
    }
  }
};
