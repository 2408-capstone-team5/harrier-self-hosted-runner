import {
  APIGatewayClient,
  GetDeploymentCommand,
} from "@aws-sdk/client-api-gateway";

const apiGatewayClient = new APIGatewayClient({ region: "us-east-1" });

export const waitForApiDeployment = async (
  apiId: string,
  deploymentId: string,
  maxWaitTime = 60,
  interval = 5
) => {
  const startTime = Date.now();

  while ((Date.now() - startTime) / 1000 < maxWaitTime) {
    try {
      // Attempt to retrieve the deployment details
      const command = new GetDeploymentCommand({
        restApiId: apiId,
        deploymentId: deploymentId,
      });

      const response = await apiGatewayClient.send(command);

      // If deployment exists, assume it's successful and break the loop
      if (response.id) {
        return response;
      }
    } catch (error) {
      // Check if deployment was not found, otherwise throw error
      //   if (error.name !== "NotFoundException") {
      //     throw error;
      //   }
      console.error(error);
      console.log(
        `Deployment not found yet. Retrying in ${interval} seconds...`
      );
    }

    // Wait for the interval before the next attempt
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
  throw new Error("❌ Timed out waiting for API Gateway deployment.");
};
