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
exports.waitForApiDeployment = void 0;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const apiGatewayClient = new client_api_gateway_1.APIGatewayClient({ region: "us-east-1" });
const waitForApiDeployment = (apiId, deploymentId, maxWaitTime = 60, interval = 5) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Date.now();
    while ((Date.now() - startTime) / 1000 < maxWaitTime) {
        try {
            // Attempt to retrieve the deployment details
            const command = new client_api_gateway_1.GetDeploymentCommand({
                restApiId: apiId,
                deploymentId: deploymentId,
            });
            const response = yield apiGatewayClient.send(command);
            // If deployment exists, assume it's successful and break the loop
            if (response.id) {
                return response;
            }
        }
        catch (error) {
            // Check if deployment was not found, otherwise throw error
            //   if (error.name !== "NotFoundException") {
            //     throw error;
            //   }
            console.error(error);
            console.log(`Deployment not found yet. Retrying in ${interval} seconds...`);
        }
        // Wait for the interval before the next attempt
        yield new Promise((resolve) => setTimeout(resolve, interval * 1000));
    }
    throw new Error("❌ Timed out waiting for API Gateway deployment.");
});
exports.waitForApiDeployment = waitForApiDeployment;
