import createMethod from "./createMethod";
import createResource from "./createResource";
import createRestApi from "./createRestAPI";

export default async function setupRestApi() {
  const restApiId = await createRestApi();
  const resourceId = await createResource(restApiId);
  await createMethod(restApiId, resourceId, "POST"); // HARDCODED httpMethod
  // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
  console.log("✅ Resource: POST /workflow created on restApiId:", restApiId);
  console.log("✅ Rest API created:", restApiId);
  return { restApiId, resourceId };
}
