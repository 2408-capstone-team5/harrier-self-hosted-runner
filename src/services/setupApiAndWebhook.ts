/* 
    - requires:
        - PAT from the aws secrets manager or the aws .env file or config object
        - 

    - [x] create and deploy lambda
    - [x] create rest api
    - [x] integrate `workflow` lambda with rest api
    - [x] deploy api
    - [ ] setup webhook with github (requires `personal-access-token, `repo`, `org`, and payload_url)
  */

import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";

import createMethod from "../utils/aws/api/createMethod";
import createResource from "../utils/aws/api/createResource";
import createRestApi from "../utils/aws/api/createRestAPI"; // idk why this keeps changing to "...API"

import getLambdaArn from "../utils/aws/lambda/getLambdaArn";
import grantInvokePermission from "../utils/aws/iam/grantInvokePermission";
import createLambdaIntegration from "../utils/aws/api/createLambdaIntegration";
import deployApi from "../utils/aws/api/deployApi";
import setupWebhook from "../utils/github/setupWebhook";

export async function setupApiAndWebhook() {
  const lambdaName = "test_lambda";
  const stageName = "test";
  const httpMethod = "POST";

  try {
    await createAndDeployLambda(lambdaName);
    // TODO: setup vpcConfig SHANE
    console.log("lambda created and deployed");

    const restApiId = await createRestApi();
    const resourceId = await createResource(restApiId);
    await createMethod(restApiId, resourceId, httpMethod);
    // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
    console.log("rest api created");

    const lambdaArn = await getLambdaArn(lambdaName);
    await grantInvokePermission(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
    await createLambdaIntegration(restApiId, resourceId, lambdaArn);
    console.log(
      "lambda execution permissions granted to rest api and integrated with rest api"
    );

    await deployApi(restApiId, stageName);
    console.log("created deployment + stage for rest api");
    console.log(
      "NEXT: setup github webhook with rest api's url as the webhook payload_url"
    );
    await setupWebhook(restApiId, stageName);

    console.log("webhook setup complete");
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}
void setupApiAndWebhook();
