import { config } from "../../../config/client";
import { configHarrier } from "../../../config/configHarrier";

import { readFileSync } from "fs";
import { resolve } from "path";
// TODO: need to import something to programmatically zip lambdas so we can just hit build
import {
  LambdaClient,
  CreateFunctionCommand,
  CreateFunctionCommandInput,
} from "@aws-sdk/client-lambda";

import { LambdaName } from "./types";

const client = new LambdaClient(config);

export default async function createAndDeployLambda(
  lambdaName: LambdaName,
  lambdaRoleArn: string
) {
  try {
    const input: CreateFunctionCommandInput = {
      FunctionName: lambdaName,
      Runtime: "nodejs20.x",
      Role: lambdaRoleArn, // service-role/??
      // TODO: dynamic role creation, is this completed yet?
      Handler: "index.handler",
      Code: {
        ZipFile: readFileSync(
          resolve(__dirname, `../../../static/zipped_lambdas/${lambdaName}.zip`)
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
      LoggingConfig: {
        LogFormat: "JSON",
        ApplicationLogLevel: "DEBUG",
        SystemLogLevel: "DEBUG",
        LogGroup: configHarrier.logGroup,
      },
    };

    const response = await client.send(new CreateFunctionCommand(input));

    if (!response?.FunctionArn) {
      throw new Error(
        `The lambda function with the name ${lambdaName} was not created.`
      );
    }
    console.log("✅ Lambda function created and deployed:", lambdaName);
    return response.FunctionArn;
  } catch (error: unknown) {
    console.error("Error creating and deploying a Lambda function:", error);
    throw new Error("createAndDeployLambda failed");
  }
}
