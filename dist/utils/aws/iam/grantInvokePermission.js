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
const client_1 = require("../../../config/client");
const configHarrier_1 = require("../../../config/configHarrier");
const lambdas_1 = require("../../../config/lambdas");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const client = new client_lambda_1.LambdaClient(client_1.config);
function grantInvokePermission(lambdaArn, restApiId
//   method: "POST" = "POST",
//   resourcePath: "workflow" = "workflow"
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = new client_lambda_1.AddPermissionCommand(Object.assign(Object.assign({}, lambdas_1.workflow), { FunctionName: lambdaArn, SourceArn: `arn:aws:execute-api:${client_1.config.region}:${configHarrier_1.configHarrier.awsAccountId}:${restApiId}/*/*/*` }));
            yield client.send(command);
        }
        catch (error) {
            console.error("Error granting invoke permission: ", error);
        }
    });
}
exports.default = grantInvokePermission;
