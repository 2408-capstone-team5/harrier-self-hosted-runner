import { config } from "../../../config/client";
import { configHarrier } from "../../../config/configHarrier";
import { installationHash } from "../../../config/installationHash";

import { readFileSync } from "fs";
import { resolve } from "path";
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
    // console.log("lambdaRoleArn: ", lambdaRoleArn);
    // throw new Error("createAndDeployLambda failed");

    const input: CreateFunctionCommandInput = {
      FunctionName: lambdaName,
      Runtime: "nodejs20.x",
      Role: lambdaRoleArn, // service-role/
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
        Ipv6AllowedForDualStack: true, // TODO: check if this is needed
      },
      PackageType: "Zip", // Theoretically we could create a Docker image for our lambdas
      Tags: {
        Name: `Harrier-lambda-${installationHash}`,
      },
      Layers: [],
      //   Environment: {
      //     Variables: {
      //       TAG_VALUE: `Harrier-${installationHash}`,
      //       REGION: configHarrier.region,
      //   },
      LoggingConfig: {
        LogFormat: "JSON", // || "Text",
        ApplicationLogLevel: "DEBUG",
        //   "TRACE" || "DEBUG" || "INFO" || "WARN" || "ERROR" || "FATAL",
        SystemLogLevel: "DEBUG", // DEBUG" || "INFO" || "WARN",
        LogGroup: "STRING_VALUE",
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
