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
  lambdaName: string,
  lambdaRoleArn: string
) {
  try {
    await zipLambda(lambdaName);

    await new Promise((res) => setTimeout(res, 10_000)); // artificial wait

    const zipFile = getLambda(lambdaName);

    await lambdaClient.send(
      new CreateFunctionCommand({
        Timeout: 900,
        FunctionName: lambdaName,
        Runtime: "nodejs20.x",
        Role: lambdaRoleArn,
        Handler: "index.handler",
        Code: { ZipFile: zipFile },
        Description: `the ${lambdaName} lambda`,
        Publish: true,
        PackageType: "Zip",
        Tags: {
          Name: `${configHarrier.tagValue}`,
        },
        Layers: [],
        Environment: {
          Variables: {
            REGION: configHarrier.region,
            TTL: configHarrier.cacheTtlHours,
            BUCKET: configHarrier.s3Name,
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
    console.error(`❌ createAndDeployLambda failed`, error);
  }
}
