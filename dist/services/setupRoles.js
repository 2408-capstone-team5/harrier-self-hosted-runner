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
exports.setupRoles = void 0;
const createServiceRole_1 = require("../utils/aws/iam/createServiceRole");
const configHarrier_1 = require("../config/configHarrier");
const servicePolicies_1 = require("../config/servicePolicies");
const ROLE_NAME_IDENTIFIER = "-service-role";
const setupRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    configHarrier_1.configHarrier.workflowServiceRoleArn = yield (0, createServiceRole_1.createLambdaServiceRole)(`${configHarrier_1.configHarrier.workflowServiceName}${ROLE_NAME_IDENTIFIER}`, servicePolicies_1.workflowLambdaPolicy);
    configHarrier_1.configHarrier.cacheEvictionServiceRoleArn = yield (0, createServiceRole_1.createLambdaServiceRole)(`${configHarrier_1.configHarrier.cacheEvictionServiceName}${ROLE_NAME_IDENTIFIER}`, servicePolicies_1.cacheEvictionLambdaPolicy);
    configHarrier_1.configHarrier.runnerInstanceServiceRoleArn = yield (0, createServiceRole_1.createInstanceServiceRole)(`${configHarrier_1.configHarrier.runnerInstanceServiceName}${ROLE_NAME_IDENTIFIER}`, servicePolicies_1.runnerInstancePolicy);
    configHarrier_1.configHarrier.schedulerServiceRoleArn = yield (0, createServiceRole_1.createSchedulerServiceRole)(`${configHarrier_1.configHarrier.schedulerServiceName}${ROLE_NAME_IDENTIFIER}`, servicePolicies_1.eventBridgeSchedulerPolicy);
});
exports.setupRoles = setupRoles;
