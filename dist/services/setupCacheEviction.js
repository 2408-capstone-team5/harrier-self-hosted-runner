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
const configHarrier_1 = require("../config/configHarrier");
const createDailySchedule_1 = require("../utils/aws/eventbridge/createDailySchedule");
function setupCacheEviction() {
    return __awaiter(this, void 0, void 0, function* () {
        const lambdaName = configHarrier_1.configHarrier.cacheEvictionServiceName;
        const scheduleName = configHarrier_1.configHarrier.schedulerServiceName;
        try {
            const evictionRoleArn = configHarrier_1.configHarrier.cacheEvictionServiceRoleArn;
            const scheduleRoleArn = configHarrier_1.configHarrier.schedulerServiceRoleArn;
            yield (0, createAndDeployLambda_1.createAndDeployLambda)(lambdaName, evictionRoleArn);
            const lambdaArn = yield (0, getLambdaArn_1.getLambdaArn)(lambdaName);
            yield (0, createDailySchedule_1.createDailySchedule)(scheduleName, lambdaArn, scheduleRoleArn);
        }
        catch (error) {
            console.error("Error executing setupCacheEviction: ", error);
            throw new Error("❌");
        }
    });
}
exports.setupCacheEviction = setupCacheEviction;
