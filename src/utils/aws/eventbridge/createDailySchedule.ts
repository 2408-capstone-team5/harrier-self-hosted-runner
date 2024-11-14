import { configHarrier } from "../../../config/configHarrier";
import {
  SchedulerClient,
  CreateScheduleCommand,
} from "@aws-sdk/client-scheduler"; // ES Modules import

const client = new SchedulerClient({ region: configHarrier.region });

export async function createDailySchedule(
  scheduleName: string,
  lambdaArn: string,
  scheduleRoleArn: string
) {
  // Create a schedule that runs every day at 3AM
  const response = await client.send(
    new CreateScheduleCommand({
      Name: scheduleName,
      ScheduleExpression: "cron(0 3 * * ? *)", // 3AM every day
      FlexibleTimeWindow: { Mode: "FLEXIBLE", MaximumWindowInMinutes: 15 },
      Target: {
        Arn: lambdaArn,
        RoleArn: scheduleRoleArn,
      },
      State: "ENABLED",
    })
  );

  if (!response.ScheduleArn) {
    throw new Error(`❌ schedule: ${scheduleName} was not created.`);
  }

  console.log(`✅ schedule ${scheduleName} CREATED`);
}

// void createDailySchedule(
//   "cache_test_lambda",
//   "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"
// );
