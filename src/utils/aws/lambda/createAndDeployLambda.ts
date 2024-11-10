import { config } from "../../../config/client";
import { configHarrier } from "../../../config/configHarrier";

import { readFileSync } from "fs";
import { resolve } from "path";
// TODO: need to import something to programmatically zip lambdas so we can just hit build
import {
  LambdaClient,
  CreateFunctionCommand,
  waitUntilFunctionActiveV2,
} from "@aws-sdk/client-lambda";

import { LambdaName } from "./types";

const lambdaClient = new LambdaClient(config);

export default async function createAndDeployLambda(
  lambdaName: LambdaName,
  lambdaRoleArn: string
) {
  try {
    const response = await lambdaClient.send(
      new CreateFunctionCommand({
        FunctionName: lambdaName,
        Runtime: "nodejs20.x",
        Role: lambdaRoleArn,
        Handler: "index.handler",
        Code: {
          ZipFile: readFileSync(
            resolve(
              __dirname,
              `../../../static/zipped_lambdas/${lambdaName}.zip`
            )
          ),
        },
        Description: "...description",
        Publish: true,
        VpcConfig: {
          SubnetIds: configHarrier.subnetIds,
          SecurityGroupIds: configHarrier.securityGroupIds,
          // TODO: does our lambda need to support both ipv4 and ipv6?
          Ipv6AllowedForDualStack: false,
        },
        PackageType: "Zip", // Theoretically we could create and use a Docker image for our lambdas
        Tags: {
          Name: `${configHarrier.tagValue}-lambda-${lambdaName}`,
        },
        Layers: [],
        Environment: {
          Variables: {
            REGION: configHarrier.region,
            HI: "mom",
          },
        },
        // NOTE: the LogGroup needs to exist PRIOR to creating the lambda if we want to specify a group to print to
        // LoggingConfig: {
        //   LogFormat: "JSON",
        //   ApplicationLogLevel: "",
        //   SystemLogLevel: "DEBUG",
        //   LogGroup: configHarrier.logGroup,
        // },
      })
    );
    console.log("lambda created, waiting for it to be active...");

    const waitResponse = await waitUntilFunctionActiveV2(
      { client: lambdaClient, maxWaitTime: 1000, minDelay: 5 },
      { FunctionName: lambdaName }
    );
    console.log("waitResponse.state", waitResponse.state);

    if (`${waitResponse.state}` !== "SUCCESS") {
      throw new Error("WaiterResult state was not SUCCESS");
    }

    console.log("✅ Lambda created, role assumed, and lambda is ACTIVE");
    return response.FunctionArn;
  } catch (error) {
    console.error("Error: Lambda creation failed", error);
    throw new Error("Error: Lambda creation failed");
  }
}
