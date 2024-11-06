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

export default async function deployApi(restApiId: string, stageName: string) {
  const { id: deploymentId } = await client.send(
    new CreateDeploymentCommand({
      restApiId,
      stageName,
      stageDescription: "test stage description",
      description: "test deployment description",
      variables: {
        theseVariables:
          " are available in the stages execution contexts and are ",
        available:
          " in our integrated lambdas thru the event.stageVariables property",
      },
      tracingEnabled: false,
    })
  );

  if (!deploymentId) {
    throw new Error("No id found in CreateDeploymentResponse.");
  }

  console.log(
    "created deployment with id: ",
    deploymentId,
    " for restApiId: ",
    restApiId,
    " and stageName: ",
    stageName
  );
}
