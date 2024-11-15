import { EC2Client, waitUntilInstanceStatusOk } from "@aws-sdk/client-ec2";

const MAX_WAITER_TIME_IN_SECONDS = 60 * 8;

export const waitEC2StatusOk = async (instanceId: string) => {
  const client = new EC2Client({ region: "us-east-1" });

  try {
    console.log("   Polling `DescribeInstanceStatus` until STATUS OK...");
    const startTime = new Date();
    await waitUntilInstanceStatusOk(
      {
        client: client,
        maxWaitTime: MAX_WAITER_TIME_IN_SECONDS,
      },
      { InstanceIds: [instanceId] }
    );
    const endTime = new Date();
    console.log(
      "   ✅ STATUS OK Succeeded after time: ",
      (endTime.getTime() - startTime.getTime()) / 1000
    );
  } catch (caught) {
    if (caught instanceof Error && caught.name === "TimeoutError") {
      caught.message = `${caught.message}. Try increasing the maxWaitTime in the waiter.`;
    }

    console.error(caught);
  }
};
