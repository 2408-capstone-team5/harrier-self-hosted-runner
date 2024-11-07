import { config } from "../../../config/client";
import {
  APIGatewayClient,
  CreateDeploymentCommand,
  //   putRestApi,
  //   CreateStageCommand,
  //   updateStage,
  //   createUsagePlan, // TODO: create usage plan
  //   createUsagePlanKey,
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient(config);

export default async function deployApi(
  restApiId: string,
  stageName: "dev" | "prod"
) {
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
    throw new Error("No id found in CreateDeploymentResponse.");
  }

  console.log(`✅ Deployed Api with DeploymentId: ${response.id}`);
}
