import { configHarrier } from "../../../config/configHarrier";
import { getLambda } from "../lambda/getLambda";
import {
  LambdaClient,
  CreateFunctionCommand,
  GetFunctionCommand,
  waitUntilFunctionActiveV2,
} from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({ region: configHarrier.region });

export async function createAndDeployLambda(
  lambdaName: string,
  lambdaRoleArn: string
) {
  let existingLambda;
  try {
    existingLambda = await lambdaClient.send(
      new GetFunctionCommand({
        FunctionName: lambdaName,
      })
    );

    if (existingLambda) {
      console.log(
        `${lambdaName} lambda already exists and has a state of ${existingLambda?.Configuration?.State}`
      );
      return;
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "ResourceNotFoundException") {
      console.error("unknown error", error);
      throw error;
    }
  }

  // if (!existingLambda) ...
  try {
    await lambdaClient.send(
      new CreateFunctionCommand({
        Timeout: 900,
        FunctionName: lambdaName,
        Runtime: "nodejs20.x",
        Role: lambdaRoleArn,
        Handler: "index.handler",
        Code: { ZipFile: getLambda(lambdaName) },
        Description: "the workflow lambda",
        Publish: true,
        PackageType: "Zip",
        Tags: {
          Name: `${configHarrier.tagValue}`,
        },
        Layers: [],
        Environment: {
          Variables: {
            REGION: configHarrier.region,
          },
        },
      })
    );

    console.log("✅ lambda CREATED");
    const waitResponse = await waitUntilFunctionActiveV2(
      { client: lambdaClient, maxWaitTime: 1000, minDelay: 5 },
      { FunctionName: lambdaName }
    );

    if (`${waitResponse.state}` !== "SUCCESS") {
      throw new Error("❌ WaiterResult state was not SUCCESS");
    }

    console.log("✅ lambda ACTIVE");
    console.log("✅ role ASSUMED");
  } catch (error) {
    console.error(
      "error creating lambda or waiting for lambda to be active with state= SUCCESS",
      error
    );
    throw error;
  }
}
