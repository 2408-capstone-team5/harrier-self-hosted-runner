/* 
    - requires:
        - PAT from the aws secrets manager or the aws .env file or config object
        - 

    - create lambda that receives webhook (queued, inprogress, completed) from github workflow run
    - deploy lambda

    - create rest API (resources, methods, integrations, resource policy)
    - register api with api gateway (stages, deployment)
    - setup github webhook with rest api's url as the webhook payload_url
  */

import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import setupRestApi from "../utils/aws/api/setupRestApi";
import setupLambdaIntegration from "../utils/aws/api/setupLambdaIntegration";
import setupWebhook from "../utils/github/setupWebhook";

export const setupWorkflowWebhook = async function () {
  try {
    await createAndDeployLambda("test_lambda");
    await setupRestApi();
    await setupLambdaIntegration();
    await setupWebhook("payload_url");
  } catch (error: unknown) {
    console.error("Error executing setupWorkflowWebhook: ", error);
  }
};

void setupWorkflowWebhook();
