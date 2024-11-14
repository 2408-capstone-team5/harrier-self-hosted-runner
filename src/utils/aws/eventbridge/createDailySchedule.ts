import { configHarrier } from "../../../config/configHarrier";
import {
  SchedulerClient,
  CreateScheduleInput,
  CreateScheduleCommand,
} from "@aws-sdk/client-scheduler"; // ES Modules import

const client = new SchedulerClient({ region: configHarrier.region });

export async function createDailySchedule(
  scheduleName: string,
  lambdaArn: string,
  scheduleRole: string
) {
  try {
    // Create a rule that runs every day at 3AM
    const input: CreateScheduleInput = {
      Name: scheduleName,
      ScheduleExpression: "cron(0 3 * * ? *)", // 3AM every day
      FlexibleTimeWindow: { Mode: "FLEXIBLE", MaximumWindowInMinutes: 15 },
      Target: {
        // Target
        Arn: lambdaArn,
        RoleArn: `arn:aws:iam::${configHarrier.awsAccountId}:role/service-role/${scheduleRole}`,
        // we need the arn of an iam role which gives to the scheduler to access the cleanup lambda, I'm using a manually (console) created role here
      },
      State: "ENABLED",
    };

    const command = new CreateScheduleCommand(input);
    const response = await client.send(command);

    console.log("Schedule ARN:", response.ScheduleArn);
    console.log("schedule response is: ", response);
    if (!response.ScheduleArn) {
      throw new Error(`The schedule with ARN ${scheduleName} was not created.`);
    }
    return `scheduleArn is: ${response.ScheduleArn}`;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw new Error("createSchedule failed");
  }
}

// void createDailySchedule(
//   "cache_test_lambda",
//   "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"
// );
