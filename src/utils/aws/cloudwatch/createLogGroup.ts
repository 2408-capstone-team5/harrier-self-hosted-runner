import {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import { configHarrier } from "../../../config/configHarrier";

export async function createLogGroup(logGroupName: string) {
  try {
    const cloudWatchLogsClient = new CloudWatchLogsClient({
      region: configHarrier.region,
    });

    await cloudWatchLogsClient.send(
      new CreateLogGroupCommand({
        logGroupName,
        tags: {
          Name: configHarrier.tagValue,
        },
      })
    );
    console.log(`✅ Log group: ${logGroupName} created successfully.`);
  } catch (error) {
    console.error(`❌ Error creating log group:`, error);
  }
}
