import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { getLambdaArn } from "../utils/aws/lambda/getLambdaArn";
import { configHarrier } from "../config/configHarrier";
import { createDailySchedule } from "../utils/aws/eventbridge/createDailySchedule";

export async function setupCacheEviction() {
  const lambdaName = configHarrier.cacheEvictionServiceName;
  const scheduleName = configHarrier.schedulerServiceName;

  try {
    const evictionRoleArn = configHarrier.cacheEvictionServiceRoleArn;
    const scheduleRoleArn = configHarrier.schedulerServiceRoleArn;

    await createAndDeployLambda(lambdaName, evictionRoleArn);
    const lambdaArn = await getLambdaArn(lambdaName);

    await createDailySchedule(scheduleName, lambdaArn, scheduleRoleArn);
  } catch (error: unknown) {
    console.error("Error executing setupCacheEviction: ", error);
    throw new Error("❌");
  }
}
