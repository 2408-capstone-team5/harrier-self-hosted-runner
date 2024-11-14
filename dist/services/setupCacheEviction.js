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
exports.setupCacheEviction = void 0;
const createAndDeployLambda_1 = require("../utils/aws/lambda/createAndDeployLambda");
const getLambdaArn_1 = require("../utils/aws/lambda/getLambdaArn");
const createDailySchedule_1 = require("../utils/aws/eventbridge/createDailySchedule");
function setupCacheEviction() {
    return __awaiter(this, void 0, void 0, function* () {
        const lambdaName = "cache_test_lambda";
        const lambdaRole = "s3CacheCleanupLambda-role-zp58dx91";
        const scheduleName = "test-schedule";
        const scheduleRole = "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec";
        try {
            yield (0, createAndDeployLambda_1.createAndDeployLambda)(lambdaName, lambdaRole);
            // TODO: lambda is using an existing role, need to make one programatically?
            console.log("lambda created with role to access s3, and deployed");
            const lambdaArn = yield (0, getLambdaArn_1.getLambdaArn)(lambdaName);
            // TODO: scheduler using an existing role, need to make one programatically?
            const scheduleId = yield (0, createDailySchedule_1.createDailySchedule)(scheduleName, lambdaArn, scheduleRole);
            console.log("eventbridge schedule created with id: ", scheduleId);
            // TODO: skipping grantInvoke for now since I have a role already. OK? NO?
            // await grantInvokePermission(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
        }
        catch (error) {
            console.error("Error executing setupWorkflowWebhook: ", error);
        }
    });
}
exports.setupCacheEviction = setupCacheEviction;
