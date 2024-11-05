import { config } from "../../../config/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { LambdaClient, CreateFunctionCommand } from "@aws-sdk/client-lambda";

export default async function createAndDeploy(
  lambdaName: "test_lambda" | "workflow_lambda" | "cleanup_lambda"
) {
  try {
    const client = new LambdaClient(config);

    const command = new CreateFunctionCommand({
      Description: "...description",
      FunctionName: lambdaName,
      Runtime: "nodejs20.x",
      PackageType: "Zip",
      Publish: true,
      Tags: {
        Name: "harrier-lambda-XXXXXXXX", // this will be populated from the harrier-tag in `config`
      },
      Handler: "index.handler",
      Role: "arn:aws:iam::536697269866:role/service-role/harrier-lambda-role-br4dh2zf", // this is where we would specify the arn of the iam role that outlines the permissions of the lambda function
      Code: {
        ZipFile: readFileSync(
          resolve(__dirname, `../../../static/zipped_lambdas/${lambdaName}.zip`)
        ),
      },
    });

    const response = await client.send(command);
    console.log("Lambda function created:", response);
  } catch (error: unknown) {
    console.error("Error creating and deploying a Lambda function:", error);
  }
}
