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
exports.grantInvokePermission = void 0;
const configHarrier_1 = require("../../../config/configHarrier");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const client = new client_lambda_1.LambdaClient({ region: configHarrier_1.configHarrier.region });
// This currently is NOT generalized and only applies to granting permission to the rest api to invoke the `workflow` lambda
function grantInvokePermission(lambdaArn, restApiId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.send(new client_lambda_1.AddPermissionCommand({
                Action: "lambda:InvokeFunction",
                Principal: "apigateway.amazonaws.com",
                StatementId: "InvokePermission_RestApi_Execute_Lambda",
                FunctionName: lambdaArn,
                SourceArn: `arn:aws:execute-api:${configHarrier_1.configHarrier.region}:${configHarrier_1.configHarrier.awsAccountId}:${restApiId}/*/*/*`,
            }));
        }
        catch (error) {
            console.error("Error granting invoke permission: ", error);
        }
    });
}
exports.grantInvokePermission = grantInvokePermission;
