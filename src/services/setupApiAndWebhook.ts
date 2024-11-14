// import createWorkflowLambdaServiceRole from "../utils/aws/iam/createWorkflowLambdaServiceRole";
import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import setupRestApi from "../utils/aws/api/setupRestApi";
import integrateLambdaWithApi from "../utils/aws/api/integrateLambdaWithApi";
import deployApi from "../utils/aws/api/deployApi";
import setupWebhook from "../utils/github/setupWebhook";

import { LambdaName } from "../utils/aws/lambda/types";

const lambdaName: LambdaName = "Harrier-workflow"; // HARDCODED lambda name ** WOOK changed it to add "Harrier-" prefix
const stageName = "dev"; // HARDCODED

export async function setupApiAndWebhook() {
  try {
    // const roleName = "_";
    const serviceRoleArn =
      "arn:aws:iam::536697269866:role/service-role/joel_test-role-927gtd4h"; // await createWorkflowLambdaServiceRole(roleName);
    await createAndDeployLambda(lambdaName, serviceRoleArn);
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupWebhook(restApiId, stageName);

    console.log("✅ completed setupApiAndWebhook ");
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
