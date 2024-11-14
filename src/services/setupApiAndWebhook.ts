import { createRoleAndAttachPolicy } from "../utils/aws/iam/createRoleAndAttachPolicy";
import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { zipLambda } from "../utils/aws/lambda/zipLambda";
import { setupRestApi } from "../utils/aws/api/setupRestApi";
import { integrateLambdaWithApi } from "../utils/aws/api/integrateLambdaWithApi";
import { deployApi } from "../utils/aws/api/deployApi";
import { setupOrgWebhook } from "../utils/github/setupOrgWebhook";

import { workflowPolicyDocument, configHarrier } from "../config/configHarrier";

export async function setupApiAndWebhook() {
  const lambdaName = `${configHarrier.tagValue}-workflow`;
  const workflowRole = `${configHarrier.tagValue}-workflow`;
  const stageName = "dev"; // HARDCODED

  try {
    await zipLambda(lambdaName);
    const workflowRoleArn = await createRoleAndAttachPolicy(
      workflowRole,
      workflowPolicyDocument
    );

    await createAndDeployLambda(lambdaName, workflowRoleArn);
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupOrgWebhook(restApiId, stageName);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
