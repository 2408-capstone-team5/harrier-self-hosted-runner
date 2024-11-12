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
const configHarrier_1 = require("../../../config/configHarrier");
const fs_1 = require("fs");
const path_1 = require("path");
// TODO: need to import something to programmatically zip lambdas so we can just hit build
const client_lambda_1 = require("@aws-sdk/client-lambda");
const lambdaClient = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
function createAndDeployLambda(lambdaName, lambdaRoleArn) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingLambda = yield lambdaClient.send(new client_lambda_1.GetFunctionCommand({
                FunctionName: lambdaName,
            }));
            if (existingLambda) {
                console.log(`${lambdaName} lambda already exists and has a state of ${(_a = existingLambda === null || existingLambda === void 0 ? void 0 : existingLambda.Configuration) === null || _a === void 0 ? void 0 : _a.State}`);
                return;
            }
            // console.log("lambda created, waiting for it to be active...");
            // const waitResponse = await waitUntilFunctionActiveV2(
            //   { client: lambdaClient, maxWaitTime: 1000, minDelay: 5 },
            //   { FunctionName: lambdaName }
            // );
            // console.log("waitResponse.state", waitResponse.state);
            // if (`${waitResponse.state}` !== "SUCCESS") {
            //   throw new Error("WaiterResult state was not SUCCESS");
            // }
            // console.log("✅ Lambda created, role assumed, and lambda is ACTIVE");
            // return response.FunctionArn;
        }
        catch (error) {
            if (error instanceof Error && error.name === "ResourceNotFoundException") {
                console.log("creating new lambda...");
                yield lambdaClient.send(new client_lambda_1.CreateFunctionCommand({
                    Timeout: 900,
                    FunctionName: lambdaName,
                    Runtime: "nodejs20.x",
                    Role: lambdaRoleArn,
                    Handler: "index.handler",
                    Code: {
                        ZipFile: (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, `../../../static/zipped_lambdas/${lambdaName}.zip`)),
                    },
                    Description: "...description",
                    Publish: true,
                    VpcConfig: {
                        SubnetIds: [configHarrier_1.configHarrier.subnetId],
                        SecurityGroupIds: configHarrier_1.configHarrier.securityGroupIds,
                        // TODO: does our lambda need to support both ipv4 and ipv6?
                        Ipv6AllowedForDualStack: false,
                    },
                    PackageType: "Zip",
                    Tags: {
                        Name: `${configHarrier_1.configHarrier.tagValue}-lambda-${lambdaName}`,
                    },
                    Layers: [],
                    Environment: {
                        Variables: {
                            REGION: configHarrier_1.configHarrier.region,
                            HI: "mom",
                        },
                    },
                }));
                console.log("✅ new lambda created");
            }
            else {
                console.error("unknown error", error);
                throw error;
            }
        }
    });
}
exports.default = createAndDeployLambda;
