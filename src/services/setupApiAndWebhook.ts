import { config } from "../config/client"; // need to import here so I can use the awsAccountId

import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import createMethod from "../utils/aws/api/createMethod";
import createResource from "../utils/aws/api/createResource";
import createRestApi from "../utils/aws/api/createRestAPI"; // idk why this keeps changing to "...API"
import getLambdaArn from "../utils/aws/lambda/getLambdaArn";
import grantInvokePermission from "../utils/aws/iam/grantInvokePermission";
import createLambdaIntegration from "../utils/aws/api/createLambdaIntegration";
import deployApi from "../utils/aws/api/deployApi";
import setupWebhook from "../utils/github/setupWebhook";

const lambdaName = "workflow"; // HARDCODED lambda name
const stageName = "dev";
const roleArn = `arn:aws:iam::${config.awsAccountId}:role/service-role/harrier-lambda-role-br4dh2zf`; // HARDCODED role name needed by `workflow` lambda

async function setupRestApi() {
  const restApiId = await createRestApi();
  const resourceId = await createResource(restApiId);
  await createMethod(restApiId, resourceId, "POST"); // HARDCODED httpMethod
  // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
  console.log("rest api created");
  return { restApiId, resourceId };
}

async function integrateLambdaWithApi(restApiId: string, resourceId: string) {
  const lambdaArn = await getLambdaArn(lambdaName);
  await grantInvokePermission(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
  await createLambdaIntegration(restApiId, resourceId, lambdaArn);
  console.log("lambda integrated with api");
}

async function setupGithubWebhook(restApiId: string) {
  console.log(
    "NEXT: setup github webhook with rest api's url as the webhook payload_url"
  );
  await setupWebhook(restApiId, stageName);
  console.log("webhook setup complete");
}

export async function setupApiAndWebhook() {
  try {
    await createAndDeployLambda(lambdaName, roleArn);
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId);
    await deployApi(restApiId, stageName);
    await setupGithubWebhook(restApiId);
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
void setupApiAndWebhook();
