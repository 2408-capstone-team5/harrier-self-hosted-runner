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
exports.createSchedulerServiceRole = exports.createInstanceServiceRole = exports.createLambdaServiceRole = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const configHarrier_1 = require("../../../config/configHarrier");
const trustPolicies_1 = require("../../../config/trustPolicies");
const trustPolicies_2 = require("../../../config/trustPolicies");
const trustPolicies_3 = require("../../../config/trustPolicies");
const iamClient = new client_iam_1.IAMClient({ region: configHarrier_1.configHarrier.region });
function createLambdaServiceRole(roleName, policyDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // previously, we checked if the role already existed and if so, just returned the existingRoleArn
            const arn = yield createBaseRole(roleName, trustPolicies_1.lambdaTrustPolicy);
            yield iamClient.send(new client_iam_1.PutRolePolicyCommand({
                RoleName: roleName,
                PolicyName: `${roleName}-policy`,
                PolicyDocument: policyDocument,
            }));
            // previously, if the !roleExistsAndIsAssumable, throw an error
            console.log(`🚦 ***waiting for lambda service ${roleName} to PROPAGATE***`);
            yield new Promise((res) => setTimeout(res, 10000));
            console.log(`✅ Permissions policy attached to ${roleName}\n`);
            return arn;
        }
        catch (error) {
            console.error("❌ Error in createWorkflowLambdaServiceRole ", error, "\n");
            throw new Error("❌");
        }
    });
}
exports.createLambdaServiceRole = createLambdaServiceRole;
function createInstanceServiceRole(roleName, policyDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // previously, we checked if the role already existed and if so, just returned the existingRoleArn
            const arn = yield createBaseRole(roleName, trustPolicies_2.instanceTrustPolicy);
            yield iamClient.send(new client_iam_1.PutRolePolicyCommand({
                RoleName: roleName,
                PolicyName: `${roleName}-policy`,
                PolicyDocument: policyDocument,
            }));
            // previously, if the !roleExistsAndIsAssumable, throw an error
            console.log(`🚦 ***waiting for instance service role ${roleName} to PROPAGATE***`);
            yield new Promise((res) => setTimeout(res, 10000));
            console.log(`✅ Permissions policy attached to ${roleName}\n`);
            return arn;
        }
        catch (error) {
            console.error("❌ Error in createInstanceServiceRole ", error, "\n");
            throw new Error("❌");
        }
    });
}
exports.createInstanceServiceRole = createInstanceServiceRole;
function createSchedulerServiceRole(roleName, policyDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // previously, we checked if the role already existed and if so, just returned the existingRoleArn
            const arn = yield createBaseRole(roleName, trustPolicies_3.schedulerTrustPolicy);
            yield iamClient.send(new client_iam_1.PutRolePolicyCommand({
                RoleName: roleName,
                PolicyName: `${roleName}-policy`,
                PolicyDocument: policyDocument,
            }));
            // previously, if the !roleExistsAndIsAssumable, throw an error
            console.log(`🚦 ***waiting for scheduler service ${roleName} to PROPAGATE***`);
            yield new Promise((res) => setTimeout(res, 10000));
            console.log(`✅ Permissions policy attached to ${roleName}\n`);
            return arn;
        }
        catch (error) {
            console.error("❌ Error in createSchedulerServiceRole ", error, "\n");
            throw new Error("❌");
        }
    });
}
exports.createSchedulerServiceRole = createSchedulerServiceRole;
function createBaseRole(roleName, trustPolicy) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield iamClient.send(new client_iam_1.CreateRoleCommand({
            RoleName: roleName,
            Path: "/service-role/",
            AssumeRolePolicyDocument: trustPolicy,
        }));
        if (!((_a = response.Role) === null || _a === void 0 ? void 0 : _a.Arn)) {
            throw new Error(`❌ Failed to create IAM role: ${roleName}`);
        }
        console.log(`✅ created ${roleName} `);
        return response.Role.Arn;
    });
}
