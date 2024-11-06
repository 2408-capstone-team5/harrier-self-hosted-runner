import { config } from "../../../config/client";
import { LambdaClient, GetFunctionCommand } from "@aws-sdk/client-lambda";
const client = new LambdaClient(config);

export default async function getLambdaArn(lambdaName: string) {
  try {
    const lambda = await client.send(
      new GetFunctionCommand({
        FunctionName: lambdaName,
      })
    );

    if (!lambda.Configuration?.FunctionArn) {
      throw new Error(
        `The lambda with a FunctionName: ${lambdaName} was not found thus no associated ARN could be retrieved.`
      );
    }

    const lambdaArn = lambda.Configuration.FunctionArn;

    return lambdaArn;
  } catch (error: unknown) {
    console.error("Error getting lambda arn: ", error);
    throw new Error("getLambdaArn failed.");
  }
}
