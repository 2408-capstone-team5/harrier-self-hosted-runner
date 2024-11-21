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
exports.getLambdaArn = void 0;
const configHarrier_1 = require("../../../config/configHarrier");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const client = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
function getLambdaArn(lambdaName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lambda = yield client.send(new client_lambda_1.GetFunctionCommand({
                FunctionName: lambdaName,
            }));
            if (!((_a = lambda.Configuration) === null || _a === void 0 ? void 0 : _a.FunctionArn)) {
                throw new Error(`❌ The lambda with a FunctionName: ${lambdaName} was not found thus no associated ARN could be retrieved.`);
            }
            const lambdaArn = lambda.Configuration.FunctionArn;
            return lambdaArn;
        }
        catch (error) {
            console.error("Error getting lambda arn: ", error);
            throw new Error("❌ Error getting lambda arn");
        }
    });
}
exports.getLambdaArn = getLambdaArn;
