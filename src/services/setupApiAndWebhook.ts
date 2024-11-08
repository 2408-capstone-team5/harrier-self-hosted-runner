import create_workflow_lambdaRoleWithPolicies from "../utils/aws/iam/create_workflow_lambdaRoleWithPolicies";
import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import setupRestApi from "../utils/aws/api/setupRestApi";
import integrateLambdaWithApi from "../utils/aws/api/integrateLambdaWithApi";
import deployApi from "../utils/aws/api/deployApi";
import setupWebhook from "../utils/github/setupWebhook";

import { LambdaName } from "../utils/aws/lambda/types";

const lambdaName: LambdaName = "workflow"; // HARDCODED lambda name
const stageName = "dev"; // HARDCODED
// const roleArn = /harrier-lambda-role-br4dh2zf`; // HARDCODED role name needed by `workflow` lambda

export async function setupApiAndWebhook() {
  //   const wait = (ms: number) => {
  //     console.log(`waiting...`);

  //     const start = Date.now();
  //     let now = start;
  //     while (now - start < ms) {
  //       now = Date.now();
  //     }
  //   };
  try {
    const roleName = "___harrier-workflow-role";
    const serviceRoleArn =
      await create_workflow_lambdaRoleWithPolicies(roleName);

    await createAndDeployLambda(lambdaName, serviceRoleArn);
    throw new Error("stop");
    // wait(5_000);
    const { restApiId, resourceId } = await setupRestApi();
    // wait(5_000);
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    // wait(5_000);
    await deployApi(restApiId, stageName);
    // wait(5_000);
    await setupWebhook(restApiId, stageName);
    console.log("✅ completed setupApiAndWebhook ");
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
void setupApiAndWebhook();
