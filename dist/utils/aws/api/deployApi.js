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
exports.deployApi = void 0;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const waitForApiDeployment_1 = require("./waitForApiDeployment");
const configHarrier_1 = require("../../../config/configHarrier");
const client = new client_api_gateway_1.APIGatewayClient({ region: configHarrier_1.configHarrier.region });
function deployApi(restApiId, stageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.send(new client_api_gateway_1.CreateDeploymentCommand({
            restApiId,
            stageName,
            stageDescription: `${stageName} stage description`,
            description: `${stageName} deployment description`,
            variables: {
                theseVariables: " are available in the stages execution contexts and are ",
                available: " in our integrated lambdas thru the event.stageVariables property",
            },
            tracingEnabled: false,
        }));
        if (!(response === null || response === void 0 ? void 0 : response.id)) {
            throw new Error("❌ No id found in CreateDeploymentResponse.");
        }
        try {
            yield (0, waitForApiDeployment_1.waitForApiDeployment)(restApiId, response.id);
            console.log(`✅ api DEPLOYED`);
        }
        catch (error) {
            console.error("❌ Error waiting for API deployment:", error);
        }
    });
}
exports.deployApi = deployApi;
