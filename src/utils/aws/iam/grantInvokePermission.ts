import { config } from "../../../config/client";
import { AddPermissionCommand, LambdaClient } from "@aws-sdk/client-lambda";

export default async function grantInvokePermission(
  lambdaArn: string,
  restApiId: string,
  method: "POST" = "POST",
  resourcePath: "workflow" = "workflow"
) {
  try {
    const client = new LambdaClient(config);
    const command = new AddPermissionCommand({
      FunctionName: lambdaArn,
      Action: "lambda:InvokeFunction",
      Principal: "apigateway.amazonaws.com",
      StatementId: "InvokePermission_RestApi_Execute_Lambda",
      SourceArn: `arn:aws:execute-api:${config.region}:${config.awsAccountId}:${restApiId}/*/${method}/${resourcePath}`,
    });
    await client.send(command);
  } catch (error) {
    console.error("Error granting invoke permission: ", error);
  }
}
