// import { config } from "../config/client"; // need to import here so I can use the awsAccountId

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
  const wait = (ms: number) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  };
  try {
    const roleName = "roleName";
    const serviceRoleArn =
      await create_workflow_lambdaRoleWithPolicies(roleName);
    console.log("serviceRoleArn: ", serviceRoleArn);

    wait(20_000);

    await createAndDeployLambda(lambdaName, serviceRoleArn);
    throw new Error("stop here");

    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupWebhook(restApiId, stageName);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
void setupApiAndWebhook();
