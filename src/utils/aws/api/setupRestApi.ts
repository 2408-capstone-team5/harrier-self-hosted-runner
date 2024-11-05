import createRestApi from "./createRestApi";
import createResource from "./createResource";
import createMethod from "./createMethod";

export default async function setupRestApi() {
  try {
    const restApiId = await createRestApi();
    const resourceId = await createResource(restApiId);
    await createMethod(restApiId, resourceId);

    console.log("'*done'");

    // create integrations
    // create resource policy
    // register api with api gateway
    // create stages
    // create deployment
  } catch (error: unknown) {
    console.error("Error executing setupRestApi: ", error);
  }
}

void setupRestApi();
