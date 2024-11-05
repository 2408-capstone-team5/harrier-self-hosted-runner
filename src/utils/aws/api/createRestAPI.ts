import { config } from "../../../config";
import {
  APIGatewayClient,
  CreateRestApiCommand,
} from "@aws-sdk/client-api-gateway";
const client = new APIGatewayClient(config);

export default async function createdAPI() {
  const { id } = await client.send(
    new CreateRestApiCommand({
      name: "test_api",
      description: "test rest and vest",
      version: "1.0",
      binaryMediaTypes: ["application/json"],
      minimumCompressionSize: 1024,
      apiKeySource: "HEADER",
      endpointConfiguration: {
        types: ["REGIONAL"],
      },
      tags: {
        name: "harrier_api_XXXXXXXXs",
      },
    })
  );

  if (!id) {
    throw new Error("No id found in createApiResponse.");
  }
  console.log("REST API created with id: ", id);
  return id;
}
