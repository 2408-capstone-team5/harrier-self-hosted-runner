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
exports.createAndDeployLambda = void 0;
const configHarrier_1 = require("../../../config/configHarrier");
const getLambda_1 = require("../lambda/getLambda");
const zipLambda_1 = require("../lambda/zipLambda");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const lambdaClient = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
function createAndDeployLambda(lambdaServiceName, lambdaRoleArn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, zipLambda_1.zipLambda)(lambdaServiceName);
            yield new Promise((res) => setTimeout(res, 5000)); // 10 seconds is likely excessive
            const zipFile = (0, getLambda_1.getLambda)(lambdaServiceName);
            const createFunction = new client_lambda_1.CreateFunctionCommand({
                Timeout: 900,
                FunctionName: lambdaServiceName,
                Role: lambdaRoleArn,
                Description: `The ${lambdaServiceName} lambda`,
                Code: { ZipFile: zipFile },
                Tags: {
                    Name: `${configHarrier_1.configHarrier.tagValue}`,
                },
                // it would be better if each lambda passed in a `variables` object with the
                // env variables they need, currently each lambda is receiving everything
                Environment: {
                    Variables: {
                        REGION: configHarrier_1.configHarrier.region,
                        TTL: configHarrier_1.configHarrier.cacheTtlHours,
                        BUCKET: configHarrier_1.configHarrier.s3Name,
                        SECRET_NAME: configHarrier_1.configHarrier.secretName,
                        HARRIER_TAG_KEY: configHarrier_1.configHarrier.harrierTagKey,
                        HARRIER_TAG_VALUE: configHarrier_1.configHarrier.harrierTagValue,
                        SSM_SEND_COMMAND_TIMEOUT: String(configHarrier_1.configHarrier.ssmSendCommandTimeout),
                        MAX_WAITER_TIME_IN_SECONDS: String(configHarrier_1.configHarrier.maxWaiterTimeInSeconds),
                        TIMEOUT_LAMBDA_NAME: configHarrier_1.configHarrier.timeoutLambdaName,
                    },
                },
                Runtime: "nodejs20.x",
                Handler: "index.handler",
                Publish: true,
                PackageType: "Zip",
                Layers: [],
            });
            yield lambdaClient.send(createFunction);
            console.log(`✅ CREATED ${lambdaServiceName} lambda`);
            const waitResponse = yield (0, client_lambda_1.waitUntilFunctionActiveV2)({ client: lambdaClient, maxWaitTime: 1000, minDelay: 5 }, { FunctionName: lambdaServiceName });
            if (`${waitResponse.state}` !== "SUCCESS") {
                throw new Error("❌ WaiterResult state was not SUCCESS");
            }
            console.log(`✅ lambda ACTIVE and ASSUMED a role`);
        }
        catch (error) {
            console.error(`❌ createAndDeployLambda failed`, error);
        }
    });
}
exports.createAndDeployLambda = createAndDeployLambda;
