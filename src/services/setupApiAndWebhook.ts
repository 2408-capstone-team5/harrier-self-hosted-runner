import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { setupRestApi } from "../utils/aws/api/setupRestApi";
import { integrateLambdaWithApi } from "../utils/aws/api/integrateLambdaWithApi";
import { deployApi } from "../utils/aws/api/deployApi";
import { setupOrgWebhook } from "../utils/github/setupOrgWebhook";

import { configHarrier } from "../config/configHarrier";

const stageName = configHarrier.stageName;

export async function setupApiAndWebhook() {
  try {
    await createAndDeployLambda(
      configHarrier.workflowServiceName,
      configHarrier.workflowServiceRoleArn
    );

    const { restApiId, resourceId } = await setupRestApi();

    await integrateLambdaWithApi(
      restApiId,
      resourceId,
      configHarrier.workflowServiceName
    );

    await deployApi(restApiId, stageName);

    await setupOrgWebhook(restApiId, stageName);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
    throw new Error("❌");
  }
}
