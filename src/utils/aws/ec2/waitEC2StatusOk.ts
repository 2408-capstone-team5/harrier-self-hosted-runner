import { EC2Client, waitUntilInstanceStatusOk } from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";

const MAX_WAITER_TIME_IN_SECONDS = 60 * 3;

export const waitEC2StatusOk = async (instanceIds: string[]) => {
  const client = new EC2Client({ region: configHarrier.region });

  try {
    console.log("   Polling `DescribeInstanceStatus` until STATUS OK...");
    const startTime = new Date();
    await waitUntilInstanceStatusOk(
      {
        client: client,
        maxWaitTime: MAX_WAITER_TIME_IN_SECONDS,
      },
      { InstanceIds: instanceIds }
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
