import { config } from "../../../config/client";
import { configHarrier } from "../../../config/configHarrier";
import { workflow } from "../../../config/lambdas";
import { AddPermissionCommand, LambdaClient } from "@aws-sdk/client-lambda";
const client = new LambdaClient(config);

export default async function grantInvokePermission(
  lambdaArn: string,
  restApiId: string
  //   method: "POST" = "POST",
  //   resourcePath: "workflow" = "workflow"
) {
  try {
    const command = new AddPermissionCommand({
      ...workflow,
      FunctionName: lambdaArn,
      SourceArn: `arn:aws:execute-api:${config.region}:${configHarrier.awsAccountId}:${restApiId}/*/*/*`,
      //   SourceArn: `arn:aws:execute-api:${config.region}:${config.awsAccountId}:${restApiId}/*/${method}/${resourcePath}`,});
    });
    await client.send(command);
  } catch (error) {
    console.error("Error granting invoke permission: ", error);
  }
}
