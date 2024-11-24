import { configHarrier } from "../../../config/configHarrier";
import { getLambda } from "../lambda/getLambda";
import { zipLambda } from "../lambda/zipLambda";
import {
  LambdaClient,
  CreateFunctionCommand,
  waitUntilFunctionActiveV2,
} from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({ region: configHarrier.region });

export async function createAndDeployLambda(
  lambdaServiceName: string,
  lambdaRoleArn: string
) {
  try {
    await zipLambda(lambdaServiceName);

    await new Promise((res) => setTimeout(res, 5_000)); // 10 seconds is likely excessive

    const zipFile = getLambda(lambdaServiceName);

    const createFunction = new CreateFunctionCommand({
      Timeout: 900, // this seems high
      FunctionName: lambdaServiceName,
      Role: lambdaRoleArn,
      Description: `The ${lambdaServiceName} lambda`,
      Code: { ZipFile: zipFile },
      Tags: {
        Name: `${configHarrier.tagValue}`,
      },
      // it would be better if each lambda passed in a `variables` object with the
      // env variables they need, currently each lambda is receiving everything
      Environment: {
        Variables: {
          REGION: configHarrier.region,
          TTL: configHarrier.cacheTtlHours,
          BUCKET: configHarrier.s3Name,
          SECRET_NAME: configHarrier.secretName,
          HARRIER_TAG_KEY: configHarrier.harrierTagKey,
          HARRIER_TAG_VALUE: configHarrier.harrierTagValue,
          SSM_SEND_COMMAND_TIMEOUT: String(configHarrier.ssmSendCommandTimeout),
          MAX_WAITER_TIME_IN_SECONDS: String(
            configHarrier.maxWaiterTimeInSeconds
          ),
          TIMEOUT_LAMBDA_NAME: configHarrier.timeoutLambdaName,
        },
      },
      Runtime: "nodejs20.x",
      Handler: "index.handler",
      Publish: true,
      PackageType: "Zip",
      Layers: [],
    });
    await lambdaClient.send(createFunction);

    console.log(`✅ CREATED ${lambdaServiceName} lambda`);

    const waitResponse = await waitUntilFunctionActiveV2(
      { client: lambdaClient, maxWaitTime: 1000, minDelay: 5 },
      { FunctionName: lambdaServiceName }
    );

    if (`${waitResponse.state}` !== "SUCCESS") {
      throw new Error("❌ WaiterResult state was not SUCCESS");
    }

    console.log(`✅ lambda ACTIVE and ASSUMED a role`);
  } catch (error) {
    console.error(`❌ createAndDeployLambda failed`, error);
  }
}
