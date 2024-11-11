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
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const client = new client_api_gateway_1.APIGatewayClient(client_1.config);
function createLambdaIntegration(restApiId, resourceId, lambdaArn) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_api_gateway_1.PutIntegrationCommand({
            restApiId,
            resourceId,
            httpMethod: "POST",
            type: "AWS_PROXY",
            integrationHttpMethod: "POST",
            uri: `arn:aws:apigateway:${client_1.config.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
        });
        yield client.send(command);
    });
}
exports.default = createLambdaIntegration;
