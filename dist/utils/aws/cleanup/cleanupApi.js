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
exports.cleanupApi = void 0;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const apiGatewayClient = new client_api_gateway_1.APIGatewayClient({ region: "us-east-1" });
// Function to delete API Gateway REST APIs with names starting with "Harrier"
const cleanupApi = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("** Start API cleanup");
        const getRestApisCommand = new client_api_gateway_1.GetRestApisCommand({});
        const apiResponse = yield apiGatewayClient.send(getRestApisCommand);
        const apis = apiResponse.items || [];
        for (const api of apis) {
            if ((_a = api.name) === null || _a === void 0 ? void 0 : _a.startsWith("harrier")) {
                // Filter by API name
                try {
                    console.log(`   Deleting API Gateway REST API: ${api.id} - ${api.name}`);
                    const deleteRestApiCommand = new client_api_gateway_1.DeleteRestApiCommand({
                        restApiId: api.id,
                    });
                    yield apiGatewayClient.send(deleteRestApiCommand);
                    console.log(`   API Gateway REST API deleted: ${api.id}`);
                }
                catch (error) {
                    console.error(`❌ Error deleting API Gateway REST API ${api.id}:`, error);
                }
            }
        }
        console.log("✅ Successfully completed API cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error cleaning up API Gateway REST APIs: ", error, "\n");
    }
});
exports.cleanupApi = cleanupApi;
