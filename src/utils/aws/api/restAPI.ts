// import fs from "fs";
// const template = fs.readFileSync(
//   "./src/utils/aws/api/rest-api-test.json",
//   "utf-8"
// );
import createRestApi from "./createRestApi";
import createResource from "./createResource";

export default async function RestAPI() {
  try {
    // create rest api
    const restApiId = await createRestApi();
    const resourceId = await createResource(restApiId);
    
  } catch (error: unknown) {
    console.error("Error creating REST API: ", error);
  } finally {
    console.log("REST API created.");
  }

  // create methods
  // create integrations
  // create resource policy
  // register api with api gateway
  // create stages
  // create deployment
}

void RestAPI();
