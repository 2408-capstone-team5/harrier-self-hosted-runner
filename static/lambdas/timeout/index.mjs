import { EC2Client, StopInstancesCommand } from "@aws-sdk/client-ec2";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
const REGION = process.env.AWS_REGION;
const [ec2Client, s3Client] = [EC2Client, S3Client].map(
  (client) => new client({ region: REGION })
);

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function stillIdle(s3BucketName, instanceId) {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: s3BucketName,
      Key: `runner-statuses/${instanceId}.json`,
    })
  );
  const bodyString = await streamToString(response.Body);
  const { status } = JSON.parse(bodyString);
  return status === "idle";
}

async function stopInstance(instanceId) {
  try {
    const stop = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const response = await ec2Client.send(stop);
    console.log("✅ Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
}

async function updateInstanceStatus(s3BucketName, instanceId, nextStatus) {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: `runner-statuses/${instanceId}.json`,
      })
    );

    const bodyString = await streamToString(response.Body);
    const instanceState = JSON.parse(bodyString);

    console.log(
      `currentStatus: ${instanceState.status}, nextStatus: ${nextStatus}`
    );

    instanceState.status = nextStatus;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: `runner-statuses/${instanceId}.json`,
        Body: JSON.stringify(instanceState),
        ContentType: "application/json",
      })
    );

    console.log(
      `✅ Status updated to ${nextStatus} for instance ${instanceId}`
    );
  } catch (error) {
    console.error(error);
  }
}

export const handler = async ({ instanceId, delayInMinutes, s3BucketName }) => {
  console.log(
    `arguments: instanceId: ${instanceId}, delay: ${delayInMinutes}, bucketName: ${s3BucketName}`
  );

  try {
    await new Promise((res) => setTimeout(res, delayInMinutes * 60 * 1000));
    const instanceIsStillIdle = await stillIdle(s3BucketName, instanceId);

    if (instanceIsStillIdle) {
      await stopInstance(instanceId);
      await updateInstanceStatus(s3BucketName, instanceId, "offline");
      console.log(
        `✅ STOPPED instance: ${instanceId} after: ~ ${delayInMinutes} minutes`
      );
    } else {
      console.log(
        `✅ Instance ${instanceId} is not idle, no action was taken on the instance.`
      );
    }
  } catch (error) {
    console.error("❌ Error in timeout handler:", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Timeout!"),
  };
};
