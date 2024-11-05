import { config } from "../../../config/client";
import {
  APIGatewayClient,
  PutMethodCommand,
} from "@aws-sdk/client-api-gateway";

export default async function createMethod(
  restApiId: string,
  resourceId: string
) {
  const client = new APIGatewayClient(config);
  await client.send(
    new PutMethodCommand({
      restApiId,
      resourceId,
      httpMethod: "POST",
      authorizationType: "NONE", // configure this later
    })
  );
}
