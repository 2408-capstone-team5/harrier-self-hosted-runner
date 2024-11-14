import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { getLambdaArn } from "../utils/aws/lambda/getLambdaArn";
import { configHarrier, evictionPolicyDocument } from "../config/configHarrier";
import { zipLambda } from "../utils/aws/lambda/zipLambda";
import { createRoleAndAttachPolicy } from "../utils/aws/iam/createRoleAndAttachPolicy";
import { createDailySchedule } from "../utils/aws/eventbridge/createDailySchedule";

export async function setupCacheEviction() {
  const lambdaName = `${configHarrier.tagValue}-eviction`;
  const evictionRole = `${configHarrier.tagValue}-eviction`; // previously: "s3CacheCleanupLambda-role-zp58dx91"
  const scheduleName = `${configHarrier.tagValue}-eviction`;
  const scheduleRole = `${configHarrier.tagValue}-eviction`; // previously: "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"

  try {
    await zipLambda(lambdaName);
    const evictionRoleArn = await createRoleAndAttachPolicy(
      evictionRole,
      evictionPolicyDocument
    );

    const scheduleRoleArn = await createRoleAndAttachPolicy(
      scheduleRole,
      schedulePolicyDocument
    );

    await createAndDeployLambda(lambdaName, evictionRoleArn);
    const lambdaArn = await getLambdaArn(lambdaName);

    await createDailySchedule(scheduleName, lambdaArn, scheduleRoleArn);
  } catch (error: unknown) {
    console.error("Error creating eviction role and attaching policy: ", error);
    throw new Error("❌");
  }
}
