import { config } from "../../../config/client";
import { installationHash } from "../../../config/installationHash";
import {
  APIGatewayClient,
  CreateRestApiCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient(config);

export default async function createAPI() {
  const { id: restApiId } = await client.send(
    new CreateRestApiCommand({
      name: "test-rest-api",
      description: "test rest and vest",
      version: "1.0",
      binaryMediaTypes: ["application/json"],
      minimumCompressionSize: 1024,
      apiKeySource: "HEADER",
      endpointConfiguration: {
        types: ["REGIONAL"],
      },
      tags: {
        name: `Harrier-${installationHash}-restApi`,
      },
    })
  );

  if (!restApiId) {
    throw new Error("No id found in CreateApiResponse.");
  }

  return restApiId;
}

// DUPLICATE
