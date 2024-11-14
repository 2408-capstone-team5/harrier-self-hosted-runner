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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var configHarrier_1 = require("../../../config/configHarrier");
var setupZippedLambdas_1 = require("../../../services/setupZippedLambdas");
var client_lambda_1 = require("@aws-sdk/client-lambda");
var lambdaClient = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
function createAndDeployLambda(lambdaName, lambdaRoleArn) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var existingLambda, error_1, waitResponse, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, lambdaClient.send(new client_lambda_1.GetFunctionCommand({
                            FunctionName: lambdaName
                        }))];
                case 1:
                    existingLambda = _b.sent();
                    if (existingLambda) {
                        console.log("".concat(lambdaName, " lambda already exists and has a state of ").concat((_a = existingLambda === null || existingLambda === void 0 ? void 0 : existingLambda.Configuration) === null || _a === void 0 ? void 0 : _a.State));
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error && error_1.name !== "ResourceNotFoundException") {
                        console.error("unknown error", error_1);
                        throw error_1;
                    }
                    return [3 /*break*/, 3];
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    console.log("creating new lambda...");
                    return [4 /*yield*/, lambdaClient.send(new client_lambda_1.CreateFunctionCommand({
                            Timeout: 900,
                            FunctionName: lambdaName,
                            Runtime: "nodejs20.x",
                            Role: lambdaRoleArn,
                            Handler: "index.handler",
                            Code: { ZipFile: (0, setupZippedLambdas_1.getLambda)(lambdaName) },
                            Description: "...description",
                            Publish: true,
                            // VpcConfig: {
                            //   //   VpcId: configHarrier.vpcId, // this is apparently not a member of the VpcConfig type
                            //   SubnetIds: [configHarrier.subnetId as string],
                            //   SecurityGroupIds: configHarrier.securityGroupIds,
                            //   Ipv6AllowedForDualStack: false,
                            // },
                            PackageType: "Zip",
                            Tags: {
                                Name: "".concat(configHarrier_1.configHarrier.tagValue, "-lambda-").concat(lambdaName)
                            },
                            Layers: [],
                            Environment: {
                                Variables: {
                                    REGION: configHarrier_1.configHarrier.region
                                }
                            }
                        }))];
                case 4:
                    _b.sent();
                    console.log("lambda created, waiting for it to be active...");
                    return [4 /*yield*/, (0, client_lambda_1.waitUntilFunctionActiveV2)({ client: lambdaClient, maxWaitTime: 1000, minDelay: 5 }, { FunctionName: lambdaName })];
                case 5:
                    waitResponse = _b.sent();
                    console.log("waitResponse.state", waitResponse.state);
                    if ("".concat(waitResponse.state) !== "SUCCESS") {
                        throw new Error("WaiterResult state was not SUCCESS");
                    }
                    console.log("✅ Lambda created, role assumed, and lambda is ACTIVE");
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _b.sent();
                    console.error("error creating lambda or waiting for lambda to be active with state= SUCCESS", error_2);
                    throw error_2;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = createAndDeployLambda;
