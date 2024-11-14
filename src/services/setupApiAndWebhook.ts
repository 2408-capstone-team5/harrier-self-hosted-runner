import { createServiceRole } from "../utils/aws/iam/createServiceRole";
import { createAndDeployLambda } from "../utils/aws/lambda/createAndDeployLambda";
import { setupRestApi } from "../utils/aws/api/setupRestApi";
import { integrateLambdaWithApi } from "../utils/aws/api/integrateLambdaWithApi";
import { deployApi } from "../utils/aws/api/deployApi";
import { setupOrgWebhook } from "../utils/github/setupOrgWebhook";

import { LambdaName } from "../utils/aws/lambda/types";
import { workflowPolicyDocument } from "../config/configHarrier";

const lambdaName: LambdaName = "workflow"; // HARDCODED lambda name
const stageName = "dev"; // HARDCODED

export async function setupApiAndWebhook() {
  try {
    const serviceRoleArn = await createServiceRole(
      "_workflow_SR",
      workflowPolicyDocument
    );
    await createAndDeployLambda(lambdaName, serviceRoleArn);
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupOrgWebhook(restApiId, stageName);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
