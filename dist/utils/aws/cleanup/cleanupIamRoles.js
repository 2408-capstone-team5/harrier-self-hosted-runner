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
// Function to delete IAM roles with names starting with "Harrier"
const cleanupIamRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const listRolesCommand = new client_iam_1.ListRolesCommand({});
        const rolesResponse = yield iamClient.send(listRolesCommand);
        const roles = rolesResponse.Roles || [];
        for (const role of roles) {
            // Filter by role name starting with "Harrier"
            if ((_a = role.RoleName) === null || _a === void 0 ? void 0 : _a.startsWith("harrier")) {
                try {
                    console.log(`Deleting IAM Role: ${role.RoleName}`);
                    const deleteRoleCommand = new client_iam_1.DeleteRoleCommand({
                        RoleName: role.RoleName,
                    });
                    yield iamClient.send(deleteRoleCommand);
                    console.log(`IAM Role deleted: ${role.RoleName}`);
                }
                catch (error) {
                    console.error(`Error deleting IAM Role ${role.RoleName}:`, error);
                }
            }
        }
    }
    catch (error) {
        console.error("Error listing IAM roles:", error);
    }
});
exports.cleanupIamRoles = cleanupIamRoles;
