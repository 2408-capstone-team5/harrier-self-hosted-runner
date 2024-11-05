import { config } from "../../../config/client";
import {
  GetResourcesCommand,
  APIGatewayClient,
  CreateResourceCommand,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient(config);

export default async function createResource(restApiId: string) {
  const { items } = await client.send(new GetResourcesCommand({ restApiId }));

  if (!Array.isArray(items)) {
    throw new Error("No items array found in createResourceResponse.");
  }

  const rootResource = items.find(({ path }) => path === "/");

  if (!rootResource) {
    throw new Error("No root resource was found.");
  }

  console.log("Root resource: ", rootResource);

  const { id: resourceId } = await client.send(
    new CreateResourceCommand({
      restApiId,
      parentId: rootResource.id,
      pathPart: "test",
    })
  );

  if (!resourceId) {
    throw new Error("No id found in createResourceResponse.");
  }

  return resourceId;
}
