import grantInvokePermission from "../iam/grantInvokePermission";
import getLambdaArn from "../lambda/getLambdaArn";
import createLambdaIntegration from "./createLambdaIntegration";

export default async function integrateLambdaWithApi(
  restApiId: string,
  resourceId: string,
  lambdaName: string
) {
  const lambdaArn = await getLambdaArn(lambdaName);
  await grantInvokePermission(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
  await createLambdaIntegration(restApiId, resourceId, lambdaArn);
  console.log("lambda integrated with api");
}
