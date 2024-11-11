import {
  APIGatewayClient,
  PutIntegrationCommand,
} from "@aws-sdk/client-api-gateway";

import { configHarrier } from "../../../config/configHarrier";

const client = new APIGatewayClient({ region: configHarrier.region });

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
    uri: `arn:aws:apigateway:${configHarrier.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
  });
  await client.send(command);
}
