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
exports.createLambdaIntegration = void 0;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const configHarrier_1 = require("../../../config/configHarrier");
const client = new client_api_gateway_1.APIGatewayClient({ region: configHarrier_1.configHarrier.region });
function createLambdaIntegration(restApiId, resourceId, lambdaArn) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.send(new client_api_gateway_1.PutIntegrationCommand({
            restApiId,
            resourceId,
            httpMethod: "POST",
            type: "AWS",
            passthroughBehavior: "WHEN_NO_TEMPLATES",
            integrationHttpMethod: "POST",
            uri: `arn:aws:apigateway:${configHarrier_1.configHarrier.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
        }));
        yield client.send(new client_api_gateway_1.PutIntegrationResponseCommand({
            restApiId,
            resourceId,
            httpMethod: "POST",
            statusCode: "200",
            // if we want to transform the response body, we can use responseTemplates, otherwise we can just pass the response body through by omitting this property
            //   responseTemplates: {
            //     "application/json": "$input.json('$.body')", //  apparently api gateway uses Velocity Template Language to transform the lambda response
            //   },
        }));
        yield client.send(new client_api_gateway_1.PutMethodResponseCommand({
            restApiId,
            resourceId,
            httpMethod: "POST",
            statusCode: "200",
            responseModels: {
                "application/json": "Empty", // this is a pre-defined model that allows any valid json response, basically it's saying that we aren't enforcing a specific response body schema
            },
        }));
    });
}
exports.createLambdaIntegration = createLambdaIntegration;
