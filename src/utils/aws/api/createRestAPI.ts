/* 
STILL NEED:
    - setup resource policy (limit to github webhook ip ranges)
    - configure cloudwatch logging/metrics
    - request validation
*/

import { configHarrier } from "../../../config/configHarrier";
// import { apiResourcePolicyDocument as policy } from "../../../config/configHarrier";

// import { installationHash } from "../../../config/installationHash";
import {
  APIGatewayClient,
  CreateRestApiCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient({ region: configHarrier.region });

export async function createRestApi() {
  const response = await client.send(
    new CreateRestApiCommand({
      name: `${configHarrier.tagValue}-api`,
      description:
        "the development rest api for Harrier that receives webhooks from github",
      version: "1.0",
      //   binaryMediaTypes: ["application/json"],
      //   minimumCompressionSize: -1,
      //   minimumCompressionSize: 10485760, // 10MB
      apiKeySource: "HEADER",
      endpointConfiguration: {
        types: ["REGIONAL"],
      },
      //   policy, // _should_ only allow traffic from github "hook" specific ip address ranges
      tags: {
        Name: configHarrier.tagValue,
      },
    })
  );

  if (!response?.id) {
    throw new Error("❌ No id found in CreateApiResponse.");
  }

  return response.id;
}
