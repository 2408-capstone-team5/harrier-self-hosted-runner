import { config } from "../../../config/client";
import {
  APIGatewayClient,
  PutMethodCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient(config);
export default async function createMethod(
  restApiId: string,
  resourceId: string,
  httpMethod: "POST"
) {
  await client.send(
    new PutMethodCommand({
      restApiId,
      resourceId,
      httpMethod,
      authorizationType: "NONE", // TODO: configure this later
    })
  );
}
