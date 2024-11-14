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
exports.createResource = void 0;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const configHarrier_1 = require("../../../config/configHarrier");
const client = new client_api_gateway_1.APIGatewayClient({ region: configHarrier_1.configHarrier.region });
function createResource(restApiId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingRootResourceId = yield getRootResource(restApiId);
        const resourceId = yield createNewResource(restApiId, existingRootResourceId);
        return resourceId;
    });
}
exports.createResource = createResource;
function getRootResource(restApiId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.send(new client_api_gateway_1.GetResourcesCommand({ restApiId }));
        if (!Array.isArray(response === null || response === void 0 ? void 0 : response.items)) {
            throw new Error("No items array found in createResourceResponse.");
        }
        const rootResource = response.items.find(({ path }) => path === "/");
        if (!(rootResource === null || rootResource === void 0 ? void 0 : rootResource.id)) {
            throw new Error("No root resource was found.");
        }
        return rootResource.id;
    });
}
function createNewResource(restApiId, parentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.send(new client_api_gateway_1.CreateResourceCommand({
            restApiId,
            parentId,
            pathPart: "workflow", // HARDCODED
        }));
        if (!(response === null || response === void 0 ? void 0 : response.id)) {
            throw new Error("No id found in createResourceResponse.");
        }
        return response.id;
    });
}
