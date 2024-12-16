import { configHarrier } from "../../../config/configHarrier";
import {
  SchedulerClient,
  CreateScheduleCommand,
} from "@aws-sdk/client-scheduler"; // ES Modules import
import { regionToTimezone } from "../../../config/regionTimezone";

// convert AWS region to timezone, or default UTC
const timezone =
  regionToTimezone[configHarrier.region] || regionToTimezone["default"];

console.log(`Using timezone: ${timezone}`);

const client = new SchedulerClient({ region: configHarrier.region });

export async function createDailySchedule(
  scheduleName: string,
  lambdaArn: string,
  scheduleRoleArn: string
) {
  // schedule that runs every day at 3AM (cron job)
  const response = await client.send(
    new CreateScheduleCommand({
      Name: scheduleName,
      ScheduleExpression: "cron(0 3 * * ? *)", // 3AM every day
      ScheduleExpressionTimezone: timezone, // set timezone dynamically based on user AWS region
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
