"use strict";
/*
STILL NEED:
    - setup resource policy (limit to github webhook ip ranges)
    - configure cloudwatch logging/metrics
    - request validation
*/
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
exports.createRestApi = void 0;
const configHarrier_1 = require("../../../config/configHarrier");
// import { apiResourcePolicyDocument as policy } from "../../../config/configHarrier";
// import { installationHash } from "../../../config/installationHash";
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const client = new client_api_gateway_1.APIGatewayClient({ region: configHarrier_1.configHarrier.region });
function createRestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.send(new client_api_gateway_1.CreateRestApiCommand({
            name: `${configHarrier_1.configHarrier.tagValue}-api`,
            description: "the development rest api for Harrier that receives webhooks from github",
            version: "1.0",
            //   binaryMediaTypes: ["application/json"],
            //   minimumCompressionSize: -1,
            //   minimumCompressionSize: 10485760, // 10MB
            apiKeySource: "HEADER",
            endpointConfiguration: {
                types: ["REGIONAL"],
            },
            //   policy, // _should_ only allow traffic from github "hook" specific ip address ranges
            tags: {
                Name: configHarrier_1.configHarrier.tagValue,
            },
        }));
        if (!(response === null || response === void 0 ? void 0 : response.id)) {
            throw new Error("❌ No id found in CreateApiResponse.");
        }
        return response.id;
    });
}
exports.createRestApi = createRestApi;
