import {
  GetResourcesCommand,
  APIGatewayClient,
  CreateResourceCommand,
} from "@aws-sdk/client-api-gateway";
import { configHarrier } from "../../../config/configHarrier";

const client = new APIGatewayClient({ region: configHarrier.region });

export async function createResource(restApiId: string) {
  const existingRootResourceId = await getRootResource(restApiId);
  const resourceId = await createNewResource(restApiId, existingRootResourceId);
  return resourceId;
}

async function getRootResource(restApiId: string) {
  const response = await client.send(new GetResourcesCommand({ restApiId }));

  if (!Array.isArray(response?.items)) {
    throw new Error("No items array found in createResourceResponse.");
  }

  const rootResource = response.items.find(({ path }) => path === "/");

  if (!rootResource?.id) {
    throw new Error("No root resource was found.");
  }

  return rootResource.id;
}

async function createNewResource(restApiId: string, parentId: string) {
  const response = await client.send(
    new CreateResourceCommand({
      restApiId,
      parentId,
      pathPart: "workflow", // HARDCODED
    })
  );

  if (!response?.id) {
    throw new Error("No id found in createResourceResponse.");
  }

  return response.id;
}
