import { configHarrier } from "../../../config/configHarrier";

import { getLambda } from "../../../services/setupZippedLambdas";
import {
  LambdaClient,
  CreateFunctionCommand,
  GetFunctionCommand,
  waitUntilFunctionActiveV2,
} from "@aws-sdk/client-lambda";

import { LambdaName } from "./types";

const lambdaClient = new LambdaClient({ region: configHarrier.region });

export async function createAndDeployLambda(
  lambdaName: LambdaName,
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
    // console.log("creating new lambda...");

    await lambdaClient.send(
      new CreateFunctionCommand({
        Timeout: 900,
        FunctionName: lambdaName,
        Runtime: "nodejs20.x",
        Role: lambdaRoleArn,
        Handler: "index.handler",
        Code: { ZipFile: getLambda(lambdaName) },
        Description: "...description",
        Publish: true,
        // VpcConfig: {
        //   //   VpcId: configHarrier.vpcId, // this is apparently not a member of the VpcConfig type
        //   SubnetIds: [configHarrier.subnetId as string],
        //   SecurityGroupIds: configHarrier.securityGroupIds,
        //   Ipv6AllowedForDualStack: false,
        // },
        PackageType: "Zip",
        Tags: {
          Name: `${configHarrier.tagValue}-lambda-${lambdaName}`,
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
