import { createMethod } from "./createMethod";
import { createResource } from "./createResource";
import { createRestApi } from "./createRestAPI";

export async function setupRestApi() {
  const restApiId = await createRestApi();
  const resourceId = await createResource(restApiId);
  await createMethod(restApiId, resourceId, "POST"); // HARDCODED httpMethod
  // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
  console.log("✅ api CREATED:", restApiId);
  return { restApiId, resourceId };
}
