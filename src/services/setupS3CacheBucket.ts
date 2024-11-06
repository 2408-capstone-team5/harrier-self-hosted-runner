/* 
    - conditionally create and config S3 bucket
  */

import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import getLambdaArn from "../utils/aws/lambda/getLambdaArn";

import createSchedule from "../utils/aws/eventbridge/createSchedule";

export async function setupS3CacheBucket() {
  const lambdaName = "cache_test_lambda";
  const lambdaRole = "s3CacheCleanupLambda-role-zp58dx91";
  const scheduleName = "test-schedule";
  const scheduleRole = "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec";

  try {
    await createAndDeployLambda(lambdaName, lambdaRole);
    // TODO: lambda is using an existing role, need to make one programatically?
    console.log("lambda created with role to access s3, and deployed");

    const lambdaArn = await getLambdaArn(lambdaName);

    // TODO: scheduler using an existing role, need to make one programatically?
    const scheduleId = await createSchedule(
      scheduleName,
      lambdaArn,
      scheduleRole
    );

    console.log("eventbridge schedule created with id: ", scheduleId);

    // TODO: skipping grantInvoke for now since I have a role already. OK? NO?
    // await grantInvokePermission(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
  } catch (error: unknown) {
    console.error("Error executing setupWorkflowWebhook: ", error);
  }
}

void setupS3CacheBucket();
