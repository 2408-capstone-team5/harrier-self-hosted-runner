import {
  APIGatewayClient,
  GetRestApisCommand,
  DeleteRestApiCommand,
} from "@aws-sdk/client-api-gateway";

const apiGatewayClient = new APIGatewayClient({ region: "us-east-1" });

// Function to delete API Gateway REST APIs with names starting with "Harrier"
export const cleanupApi = async () => {
  try {
    const getRestApisCommand = new GetRestApisCommand({});
    const apiResponse = await apiGatewayClient.send(getRestApisCommand);

    const apis = apiResponse.items || [];

    for (const api of apis) {
      if (api.name?.startsWith("Harrier")) {
        // Filter by API name
        try {
          console.log(`Deleting API Gateway REST API: ${api.id} - ${api.name}`);
          const deleteRestApiCommand = new DeleteRestApiCommand({
            restApiId: api.id,
          });
          await apiGatewayClient.send(deleteRestApiCommand);
          console.log(`API Gateway REST API deleted: ${api.id}`);
        } catch (error) {
          console.error(
            `Error deleting API Gateway REST API ${api.id}:`,
            error
          );
        }
      }
    }
  } catch (error) {
    console.error("Error listing API Gateway REST APIs:", error);
  }
};
