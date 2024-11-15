import {
  LambdaClient,
  ListFunctionsCommand,
  DeleteFunctionCommand,
} from "@aws-sdk/client-lambda";
import { configHarrier } from "../../../config/configHarrier";

const lambdaClient = new LambdaClient({ region: configHarrier.region });

// Function to delete Lambdas with names starting with "Harrier"
export const cleanupLambdas = async () => {
  try {
    console.log("** Start Lambda cleanup");

    const listFunctionsCommand = new ListFunctionsCommand({});
    const lambdaResponse = await lambdaClient.send(listFunctionsCommand);

    const lambdaFunctions = lambdaResponse.Functions || [];

    for (const lambda of lambdaFunctions) {
      if (lambda.FunctionName?.startsWith("harrier")) {
        // Filter by name prefix
        try {
          console.log(`   Deleting Lambda function: ${lambda.FunctionName}`);
          const deleteFunctionCommand = new DeleteFunctionCommand({
            FunctionName: lambda.FunctionName,
          });
          await lambdaClient.send(deleteFunctionCommand);
          console.log(`   Lambda function deleted: ${lambda.FunctionName}`);
        } catch (error) {
          console.error(
            `❌ Error deleting Lambda function ${lambda.FunctionName}:`,
            error
          );
        }
      }
    }
    console.log("✅ Successfully completed Lambda cleanup.\n");
  } catch (error) {
    console.error("❌ Error listing Lambda functions:", error, "\n");
  }
};
