import { configHarrier } from "../../../config/configHarrier";
import {
  APIGatewayClient,
  PutMethodCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient({ region: configHarrier.region });
export async function createMethod(
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
