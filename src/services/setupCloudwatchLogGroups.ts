import { createLogGroup } from "../utils/aws/cloudwatch/createLogGroup";
import { configHarrier } from "../config/configHarrier";

export async function setupCloudwatchLogGroups() {
  try {
    const logGroupName = configHarrier.logGroupName;
    await createLogGroup(logGroupName);
    console.log("✅ log group CREATED");
  } catch (error: unknown) {
    console.error(`❌ log group creation FAILED: ${error}`);
  }
}
