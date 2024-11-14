import {
  APIGatewayClient,
  PutIntegrationCommand,
  PutIntegrationResponseCommand,
  PutMethodResponseCommand,
} from "@aws-sdk/client-api-gateway";

import { configHarrier } from "../../../config/configHarrier";

const client = new APIGatewayClient({ region: configHarrier.region });

export async function createLambdaIntegration(
  restApiId: string,
  resourceId: string,
  lambdaArn: string
) {
  await client.send(
    new PutIntegrationCommand({
      restApiId,
      resourceId,
      httpMethod: "POST",
      type: "AWS", //  "HTTP" || "AWS" || "MOCK" || "HTTP_PROXY" || "AWS_PROXY" (lambda proxy integration OFF)
      passthroughBehavior: "WHEN_NO_TEMPLATES", // 'WHEN_NO_MATCH' || 'WHEN_NO_TEMPLATES' || 'NEVER' (input passthrough)
      integrationHttpMethod: "POST",
      uri: `arn:aws:apigateway:${configHarrier.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
    })
  );

  await client.send(
    new PutIntegrationResponseCommand({
      restApiId,
      resourceId,
      httpMethod: "POST",
      statusCode: "200",
      // if we want to transform the response body, we can use responseTemplates, otherwise we can just pass the response body through by omitting this property

      //   responseTemplates: {
      //     "application/json": "$input.json('$.body')", //  apparently api gateway uses Velocity Template Language to transform the lambda response
      //   },
    })
  );

  await client.send(
    new PutMethodResponseCommand({
      restApiId,
      resourceId,
      httpMethod: "POST",
      statusCode: "200",
      responseModels: {
        "application/json": "Empty", // this is a pre-defined model that allows any valid json response, basically it's saying that we aren't enforcing a specific response body schema
      },
    })
  );
}
