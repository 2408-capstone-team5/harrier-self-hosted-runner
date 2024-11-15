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
function createAndDeployLambda(lambdaName, lambdaRoleArn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, zipLambda_1.zipLambda)(lambdaName);
            yield new Promise((res) => setTimeout(res, 10000)); // artificial wait
            const zipFile = (0, getLambda_1.getLambda)(lambdaName);
            yield lambdaClient.send(new client_lambda_1.CreateFunctionCommand({
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
                    Name: `${configHarrier_1.configHarrier.tagValue}`,
                },
                Layers: [],
                Environment: {
                    Variables: {
                        REGION: configHarrier_1.configHarrier.region,
                        TTL: configHarrier_1.configHarrier.cacheTtlHours,
                        BUCKET: configHarrier_1.configHarrier.s3Name,
                    },
                },
            }));
            console.log("✅ lambda CREATED");
            const waitResponse = yield (0, client_lambda_1.waitUntilFunctionActiveV2)({ client: lambdaClient, maxWaitTime: 1000, minDelay: 5 }, { FunctionName: lambdaName });
            if (`${waitResponse.state}` !== "SUCCESS") {
                throw new Error("❌ WaiterResult state was not SUCCESS");
            }
            console.log("✅ lambda ACTIVE");
            console.log("✅ role ASSUMED");
        }
        catch (error) {
            console.error(`❌ createAndDeployLambda failed`, error);
        }
    });
}
exports.createAndDeployLambda = createAndDeployLambda;
