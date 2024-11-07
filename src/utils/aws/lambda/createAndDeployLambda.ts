import { config } from "../../../config/client";
import { installationHash } from "../../../config/installationHash";

import { readFileSync } from "fs";
import { resolve } from "path";
import { LambdaClient, CreateFunctionCommand } from "@aws-sdk/client-lambda";

import { LambdaName } from "./types";

const client = new LambdaClient(config);

export default async function createAndDeployLambda(lambdaName: LambdaName) {
  try {
    const { FunctionArn } = await client.send(
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
        Role: `arn:aws:iam::${config.awsAccountId}:role/service-role/harrier-lambda-role-br4dh2zf`, // this is where we would specify the arn of the iam role that outlines the permissions of the lambda function
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

    if (!FunctionArn) {
      throw new Error(
        `The lambda function with the name ${lambdaName} was not created.`
      );
    }
    return FunctionArn;
  } catch (error: unknown) {
    console.error("Error creating and deploying a Lambda function:", error);
    throw new Error("createAndDeployLambda failed");
  }
}
