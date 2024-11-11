/* 
STILL NEED:
    - setup resource policy (limit to github webhook ip ranges)
    - configure cloudwatch logging/metrics
    - request validation
*/

import { configHarrier } from "../../../config/configHarrier";
import { installationHash } from "../../../config/installationHash";
import {
  APIGatewayClient,
  CreateRestApiCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient({region: configHarrier.region})

export default async function createRestApi() {
  const response = await client.send(
    new CreateRestApiCommand({
      name: "dev-rest-api",
      description: "rest and vest",
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

  if (!response?.id) {
    throw new Error("No id found in CreateApiResponse.");
  }

  return response.id;
}
