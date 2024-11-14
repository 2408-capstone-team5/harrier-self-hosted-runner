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
exports.setupApiAndWebhook = void 0;
var createWorkflowLambdaServiceRole_1 = require("../utils/aws/iam/createWorkflowLambdaServiceRole");
var createAndDeployLambda_1 = require("../utils/aws/lambda/createAndDeployLambda");
var setupRestApi_1 = require("../utils/aws/api/setupRestApi");
var integrateLambdaWithApi_1 = require("../utils/aws/api/integrateLambdaWithApi");
var deployApi_1 = require("../utils/aws/api/deployApi");
var setupWebhook_1 = require("../utils/github/setupWebhook");
var configHarrier_1 = require("../config/configHarrier");
var lambdaName = "workflow"; // HARDCODED lambda name
var stageName = "dev"; // HARDCODED
function setupApiAndWebhook() {
    return __awaiter(this, void 0, void 0, function () {
        var serviceRoleArn, _a, restApiId, resourceId, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, createWorkflowLambdaServiceRole_1["default"])(configHarrier_1.configHarrier.workflowLambdaServiceRole)];
                case 1:
                    serviceRoleArn = _b.sent();
                    return [4 /*yield*/, (0, createAndDeployLambda_1["default"])(lambdaName, serviceRoleArn)];
                case 2:
                    _b.sent();
                    throw new Error("💩💩💩");
                case 3:
                    _a = _b.sent(), restApiId = _a.restApiId, resourceId = _a.resourceId;
                    return [4 /*yield*/, (0, integrateLambdaWithApi_1["default"])(restApiId, resourceId, lambdaName)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, deployApi_1["default"])(restApiId, stageName)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, setupWebhook_1["default"])(restApiId, stageName)];
                case 6:
                    _b.sent();
                    console.log("✅ completed setupApiAndWebhook ");
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    console.error("Error executing setupApiAndWebhook: ", error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.setupApiAndWebhook = setupApiAndWebhook;
void setupApiAndWebhook();
