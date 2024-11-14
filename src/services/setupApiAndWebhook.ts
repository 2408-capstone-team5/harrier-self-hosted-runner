// import { createServiceRole } from "../utils/aws/iam/createServiceRole";
import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { setupRestApi } from "../utils/aws/api/setupRestApi";
import { integrateLambdaWithApi } from "../utils/aws/api/integrateLambdaWithApi";
import { deployApi } from "../utils/aws/api/deployApi";
import { setupOrgWebhook } from "../utils/github/setupOrgWebhook";

import { configHarrier } from "../config/configHarrier";

const lambdaName = `${configHarrier.tagValue}-workflow`;
// const workflowServiceRole = `${configHarrier.tagValue}-workflow-service-role`;
const stageName = "dev"; // HARDCODED

export async function setupApiAndWebhook() {
  try {
    // Create service roles in own services file
    // const serviceRoleArn = await createServiceRole(
    //   workflowServiceRole,
    //   workflowPolicyDocument
    // );
    await createAndDeployLambda(
      lambdaName,
      configHarrier.workflowServiceRoleArn,
    );
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupOrgWebhook(restApiId, stageName);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
