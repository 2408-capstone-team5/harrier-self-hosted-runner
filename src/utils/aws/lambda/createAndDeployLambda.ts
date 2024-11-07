import { config } from "../../../config/client";
import { installationHash } from "../../../config/installationHash";

import { readFileSync } from "fs";
import { resolve } from "path";
import { LambdaClient, CreateFunctionCommand } from "@aws-sdk/client-lambda";

import { LambdaName } from "./types";

const client = new LambdaClient(config);

export default async function createAndDeployLambda(
  lambdaName: LambdaName,
  lambdaRole: string
) {
  try {
    // console.log("lambdaRole: ", lambdaRole);
    // throw new Error("createAndDeployLambda failed");
    const response = await client.send(
      new CreateFunctionCommand({
        Description: "...description",
        FunctionName: lambdaName,
        Runtime: "nodejs20.x",
        PackageType: "Zip",
        Publish: true,
        Tags: {
          Name: `Harrier-lambda-${installationHash}`,
        },
        Handler: "index.handler",
        // TODO: dynamic role creation
        Role: lambdaRole,
        Code: {
          ZipFile: readFileSync(
            resolve(
              __dirname,
              `../../../static/zipped_lambdas/${lambdaName}.zip`
            )
          ),
        },
      })
    );

    if (!response?.FunctionArn) {
      throw new Error(
        `The lambda function with the name ${lambdaName} was not created.`
      );
    }
    return response.FunctionArn;
  } catch (error: unknown) {
    console.error("Error creating and deploying a Lambda function:", error);
    throw new Error("createAndDeployLambda failed");
  }
}
