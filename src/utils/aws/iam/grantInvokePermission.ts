import { config } from "../../../config/client";
import { workflow } from "../../../config/lambdas";
import { AddPermissionCommand, LambdaClient } from "@aws-sdk/client-lambda";

export default async function grantInvokePermission(
  lambdaArn: string,
  restApiId: string
  //   method: "POST" = "POST",
  //   resourcePath: "test" = "test"
) {
  try {
    const client = new LambdaClient(config);

    const command = new AddPermissionCommand({
      ...workflow,
      FunctionName: lambdaArn,
      SourceArn: `arn:aws:execute-api:${config.region}:${config.awsAccountId}:${restApiId}/*/*/*`,
      //   SourceArn: `arn:aws:execute-api:${config.region}:${config.awsAccountId}:${restApiId}/*/${method}/${resourcePath}`,});
    });
    await client.send(command);
  } catch (error) {
    console.error("Error granting invoke permission: ", error);
  }
}
