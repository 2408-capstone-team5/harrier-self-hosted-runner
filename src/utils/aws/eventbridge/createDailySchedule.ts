import { configHarrier } from "../../../config/configHarrier";
import {
  SchedulerClient,
  CreateScheduleCommand,
} from "@aws-sdk/client-scheduler"; // ES Modules import

const regionToTimezone: Record<string, string> = {
  // North America
  "us-east-1": "America/New_York",
  "us-east-2": "America/New_York",
  "us-west-1": "America/Los_Angeles",
  "us-west-2": "America/Los_Angeles",
  "ca-central-1": "America/Toronto",

  // South America
  "sa-east-1": "America/Sao_Paulo",

  // Europe
  "eu-west-1": "Europe/Dublin",
  "eu-west-2": "Europe/London",
  "eu-west-3": "Europe/Paris",
  "eu-north-1": "Europe/Stockholm",
  "eu-central-1": "Europe/Berlin",
  "eu-south-1": "Europe/Rome",
  "eu-south-2": "Europe/Madrid",
  "eu-central-2": "Europe/Zurich",

  // Asia Pacific
  "ap-southeast-1": "Asia/Singapore",
  "ap-southeast-2": "Australia/Sydney",
  "ap-southeast-3": "Asia/Jakarta",
  "ap-southeast-4": "Australia/Melbourne",
  "ap-south-1": "Asia/Kolkata",
  "ap-south-2": "Asia/Colombo",
  "ap-northeast-1": "Asia/Tokyo", // Japan
  "ap-northeast-2": "Asia/Seoul", // Korea
  "ap-northeast-3": "Asia/Osaka", // Japan
  "ap-east-1": "Asia/Hong_Kong",

  // Middle East
  "me-south-1": "Asia/Dubai",
  "me-central-1": "Asia/Riyadh",

  // Africa
  "af-south-1": "Africa/Johannesburg",

  // China
  "cn-north-1": "Asia/Shanghai",
  "cn-northwest-1": "Asia/Shanghai",

  // Default fallback
  default: "UTC",
};

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
