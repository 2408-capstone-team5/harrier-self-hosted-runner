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
exports.cleanupIamRoles = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const iamClient = new client_iam_1.IAMClient({ region: "us-east-1" });
// Function to detach managed policies from a role
function detachManagedPolicies(roleName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listAttachedRolePoliciesCommand = new client_iam_1.ListAttachedRolePoliciesCommand({ RoleName: roleName });
            const attachedPoliciesResponse = yield iamClient.send(listAttachedRolePoliciesCommand);
            const attachedPolicies = attachedPoliciesResponse.AttachedPolicies || [];
            for (const policy of attachedPolicies) {
                console.log(`   Detaching managed policy: ${policy.PolicyArn} from role: ${roleName}`);
                const detachRolePolicyCommand = new client_iam_1.DetachRolePolicyCommand({
                    RoleName: roleName,
                    PolicyArn: policy.PolicyArn,
                });
                yield iamClient.send(detachRolePolicyCommand);
                console.log(`   Successfully detached policy: ${policy.PolicyArn}`);
            }
        }
        catch (error) {
            console.error(`❌ Error detaching managed policies for role ${roleName}:`, error);
        }
    });
}
// Function to delete inline policies attached to the role
function deleteInlinePolicies(roleName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listRolePoliciesCommand = new client_iam_1.ListRolePoliciesCommand({
                RoleName: roleName,
            });
            const inlinePoliciesResponse = yield iamClient.send(listRolePoliciesCommand);
            const inlinePolicies = inlinePoliciesResponse.PolicyNames || [];
            for (const policyName of inlinePolicies) {
                console.log(`   Deleting inline policy: ${policyName} from role: ${roleName}`);
                const deleteRolePolicyCommand = new client_iam_1.DeleteRolePolicyCommand({
                    RoleName: roleName,
                    PolicyName: policyName,
                });
                yield iamClient.send(deleteRolePolicyCommand);
                console.log(`   Successfully deleted inline policy: ${policyName}`);
            }
        }
        catch (error) {
            console.error(`❌ Error deleting inline policies for role ${roleName}:`, error);
        }
    });
}
// Function to delete IAM roles with names starting with "harrier"
const cleanupIamRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("** Start IAM role cleanup");
        const listRolesCommand = new client_iam_1.ListRolesCommand({});
        const rolesResponse = yield iamClient.send(listRolesCommand);
        const roles = rolesResponse.Roles || [];
        for (const role of roles) {
            // Filter by role name starting with "Harrier"
            if ((_a = role.RoleName) === null || _a === void 0 ? void 0 : _a.startsWith("harrier")) {
                try {
                    // Step 1: Detach managed policies
                    yield detachManagedPolicies(role.RoleName);
                    // Step 2: Delete inline policies
                    yield deleteInlinePolicies(role.RoleName);
                    // Step 3: Delete role
                    console.log(`   Deleting IAM Role: ${role.RoleName}`);
                    const deleteRoleCommand = new client_iam_1.DeleteRoleCommand({
                        RoleName: role.RoleName,
                    });
                    yield iamClient.send(deleteRoleCommand);
                    console.log(`   IAM Role deleted: ${role.RoleName}`);
                }
                catch (error) {
                    console.error(`❌ Error deleting IAM Role ${role.RoleName}:`, error);
                }
            }
        }
        console.log("✅ Successfully completed IAM role cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error listing IAM roles:", error, "\n");
    }
});
exports.cleanupIamRoles = cleanupIamRoles;
