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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupOrgWebhook = void 0;
const axios_1 = __importDefault(require("axios"));
const configHarrier_1 = require("../../config/configHarrier");
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
function setupOrgWebhook(restApiId, stageName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pat = yield getPat();
            const ghOwnerName = configHarrier_1.configHarrier.ghOwnerName;
            yield axios_1.default.post(`https://api.github.com/orgs/${ghOwnerName}/hooks`, {
                config: {
                    url: `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/workflow`,
                    content_type: "json",
                    insecure_ssl: "0",
                },
                events: ["workflow_job"],
                active: true,
                name: "web",
            }, {
                headers: {
                    Authorization: `Bearer ${pat}`,
                    Accept: "application/vnd.github.v3+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
            console.log(`✅ webhook CREATED for ${ghOwnerName}`);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error("❌ Error creating organization webhook:", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
        }
    });
}
exports.setupOrgWebhook = setupOrgWebhook;
function getPat() {
    return __awaiter(this, void 0, void 0, function* () {
        const secretClient = new client_secrets_manager_1.SecretsManagerClient({
            region: configHarrier_1.configHarrier.region,
        });
        const secretResponse = yield secretClient.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: "github/pat/harrier",
            VersionStage: "AWSCURRENT",
        }));
        const pat = secretResponse.SecretString;
        return pat;
    });
}
