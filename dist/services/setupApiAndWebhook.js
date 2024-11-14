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
exports.setupApiAndWebhook = void 0;
const createServiceRole_1 = require("../utils/aws/iam/createServiceRole");
const createAndDeployLambda_1 = require("../utils/aws/lambda/createAndDeployLambda");
const zipLambda_1 = require("../utils/aws/lambda/zipLambda");
const setupRestApi_1 = require("../utils/aws/api/setupRestApi");
const integrateLambdaWithApi_1 = require("../utils/aws/api/integrateLambdaWithApi");
const deployApi_1 = require("../utils/aws/api/deployApi");
const setupOrgWebhook_1 = require("../utils/github/setupOrgWebhook");
const configHarrier_1 = require("../config/configHarrier");
const lambdaName = `${configHarrier_1.configHarrier.tagValue}-workflow`;
const workflowServiceRole = `${configHarrier_1.configHarrier.tagValue}-workflow-service-role`;
const stageName = "dev"; // HARDCODED
function setupApiAndWebhook() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, zipLambda_1.zipLambda)(lambdaName);
            const serviceRoleArn = yield (0, createServiceRole_1.createServiceRole)(workflowServiceRole, configHarrier_1.workflowPolicyDocument);
            yield (0, createAndDeployLambda_1.createAndDeployLambda)(lambdaName, serviceRoleArn);
            const { restApiId, resourceId } = yield (0, setupRestApi_1.setupRestApi)();
            yield (0, integrateLambdaWithApi_1.integrateLambdaWithApi)(restApiId, resourceId, lambdaName);
            yield (0, deployApi_1.deployApi)(restApiId, stageName);
            yield (0, setupOrgWebhook_1.setupOrgWebhook)(restApiId, stageName);
        }
        catch (error) {
            console.error("Error executing setupApiAndWebhook: ", error);
        }
    });
}
exports.setupApiAndWebhook = setupApiAndWebhook;
