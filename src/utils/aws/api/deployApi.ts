import {
  APIGatewayClient,
  CreateDeploymentCommand,
} from "@aws-sdk/client-api-gateway";

import { waitForApiDeployment } from "./waitForApiDeployment";
import { configHarrier } from "../../../config/configHarrier";

const client = new APIGatewayClient({ region: configHarrier.region });

export async function deployApi(restApiId: string, stageName: string) {
  const response = await client.send(
    new CreateDeploymentCommand({
      restApiId,
      stageName,
      stageDescription: `${stageName} stage description`,
      description: `${stageName} deployment description`,
      variables: {
        theseVariables:
          " are available in the stages execution contexts and are ",
        available:
          " in our integrated lambdas thru the event.stageVariables property",
      },
      tracingEnabled: false,
    })
  );

  if (!response?.id) {
    throw new Error("❌ No id found in CreateDeploymentResponse.");
  }

  try {
    await waitForApiDeployment(restApiId, response.id);
    console.log(`✅ api DEPLOYED`);
  } catch (error) {
    console.error("❌ Error waiting for API deployment:", error);
  }
}
