import { createRoleAndAttachPolicy } from "../utils/aws/iam/createRoleAndAttachPolicy";
import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { zipLambda } from "../utils/aws/lambda/zipLambda";
import { setupRestApi } from "../utils/aws/api/setupRestApi";
import { integrateLambdaWithApi } from "../utils/aws/api/integrateLambdaWithApi";
import { deployApi } from "../utils/aws/api/deployApi";
import { setupOrgWebhook } from "../utils/github/setupOrgWebhook";

import { workflowPolicyDocument, configHarrier } from "../config/configHarrier";

const lambdaName = `${configHarrier.tagValue}-workflow`;
const workflowServiceRole = `${configHarrier.tagValue}-workflow-service-role`;
const stageName = "dev"; // HARDCODED

export async function setupApiAndWebhook() {
  try {
    await zipLambda(lambdaName);
    const workflowRoleArn = await createRoleAndAttachPolicy(
      workflowServiceRole,
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
