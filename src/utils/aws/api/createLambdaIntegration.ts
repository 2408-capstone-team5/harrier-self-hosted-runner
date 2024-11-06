import { config } from "../../../config/client";
import {
  APIGatewayClient,
  PutIntegrationCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient(config);

export default async function createLambdaIntegration(
  restApiId: string,
  resourceId: string,
  lambdaArn: string
) {
  const command = new PutIntegrationCommand({
    restApiId,
    resourceId,
    httpMethod: "POST",
    type: "AWS_PROXY",
    integrationHttpMethod: "POST",
    uri: `arn:aws:apigateway:${config.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
  });
  await client.send(command);
}
