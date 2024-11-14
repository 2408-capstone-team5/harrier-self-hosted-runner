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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var configHarrier_1 = require("../../config/configHarrier");
var client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
function getPat() {
    return __awaiter(this, void 0, void 0, function () {
        var org, secretClient, secretResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    org = "2408-capstone-team5";
                    secretClient = new client_secrets_manager_1.SecretsManagerClient({
                        region: configHarrier_1.configHarrier.region
                    });
                    return [4 /*yield*/, secretClient.send(new client_secrets_manager_1.GetSecretValueCommand({
                            SecretId: "github/pat/harrier",
                            VersionStage: "AWSCURRENT"
                        }))];
                case 1:
                    secretResponse = _a.sent();
                    return [2 /*return*/, { org: org, pat: secretResponse.SecretString }];
            }
        });
    });
}
function setupOrgWebhook(restApiId, stageName) {
    var _a;
    if (stageName === void 0) { stageName = "dev"; }
    return __awaiter(this, void 0, void 0, function () {
        var _b, org, pat, response, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getPat()];
                case 1:
                    _b = _c.sent(), org = _b.org, pat = _b.pat;
                    return [4 /*yield*/, axios_1["default"].post("https://api.github.com/orgs/".concat(org, "/hooks"), {
                            config: {
                                url: "https://".concat(restApiId, ".execute-api.us-east-1.amazonaws.com/").concat(stageName, "/workflow"),
                                content_type: "json",
                                insecure_ssl: "0"
                            },
                            events: ["workflow_job"],
                            active: true,
                            name: "web"
                        }, {
                            headers: {
                                Authorization: "Bearer ".concat(pat),
                                Accept: "application/vnd.github.v3+json",
                                "X-GitHub-Api-Version": "2022-11-28"
                            }
                        })];
                case 2:
                    response = _c.sent();
                    console.log("✅ Organization webhook created successfully:", response.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    if (axios_1["default"].isAxiosError(error_1)) {
                        console.error("Error creating organization webhook:", (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                    }
                    else {
                        console.error("Unexpected error:", error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = setupOrgWebhook;
