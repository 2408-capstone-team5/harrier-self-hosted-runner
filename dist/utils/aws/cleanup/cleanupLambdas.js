"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupLambdas = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const configHarrier_1 = require("../../../config/configHarrier");
const lambdaClient = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
// Function to delete Lambdas with names starting with "Harrier"
const cleanupLambdas = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("** Start Lambda cleanup");
        const listFunctionsCommand = new client_lambda_1.ListFunctionsCommand({});
        const lambdaResponse = yield lambdaClient.send(listFunctionsCommand);
        const lambdaFunctions = lambdaResponse.Functions || [];
        for (const lambda of lambdaFunctions) {
            if ((_a = lambda.FunctionName) === null || _a === void 0 ? void 0 : _a.startsWith("harrier")) {
                // Filter by name prefix
                try {
                    console.log(`   Deleting Lambda function: ${lambda.FunctionName}`);
                    const deleteFunctionCommand = new client_lambda_1.DeleteFunctionCommand({
                        FunctionName: lambda.FunctionName,
                    });
                    yield lambdaClient.send(deleteFunctionCommand);
                    console.log(`   Lambda function deleted: ${lambda.FunctionName}`);
                }
                catch (error) {
                    console.error(`❌ Error deleting Lambda function ${lambda.FunctionName}:`, error);
                }
            }
        }
        console.log("✅ Successfully completed Lambda cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error listing Lambda functions:", error, "\n");
    }
});
exports.cleanupLambdas = cleanupLambdas;
