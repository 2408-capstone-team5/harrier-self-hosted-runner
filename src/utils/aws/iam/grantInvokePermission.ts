import { configHarrier } from "../../../config/configHarrier";
import { AddPermissionCommand, LambdaClient } from "@aws-sdk/client-lambda";
const client = new LambdaClient({ region: configHarrier.region });

// This currently is NOT generalized and only applies to granting permission to the rest api to invoke the `workflow` lambda
export async function grantInvokePermission(
  lambdaArn: string,
  restApiId: string
) {
  try {
    await client.send(
      new AddPermissionCommand({
        Action: "lambda:InvokeFunction",
        Principal: "apigateway.amazonaws.com",
        StatementId: "InvokePermission_RestApi_Execute_Lambda",
        FunctionName: lambdaArn,
        SourceArn: `arn:aws:execute-api:${configHarrier.region}:${configHarrier.awsAccountId}:${restApiId}/*/*/*`,
      })
    );
  } catch (error) {
    console.error("Error granting invoke permission: ", error);
  }
}
