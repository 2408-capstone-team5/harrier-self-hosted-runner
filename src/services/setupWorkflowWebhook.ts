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

import createAndDeploy from "../utils/aws/lambda/createAndDeploy";
// import createRestAPI from "../utils/aws/api/createRestAPI";
// import connectLambdaToRestAPI from "../utils/aws/api/connectLambdaToRestAPI";
// import setupWebhook from "../utils/github/setupWebhook";

export const setupWorkflowWebhook = async function () {
  try {
    await createAndDeploy("workflow_lambda");
    // await createRestAPI(); // return payload_url?

    // await connectLambdaToRestAPI();
    // await setupWebhook();
  } catch (error: unknown) {
    console.error("Error executing setupWorkflowWebhook: ", error);
  }
};
