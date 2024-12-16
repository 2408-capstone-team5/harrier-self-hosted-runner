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
exports.createInstanceProfile = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const configHarrier_1 = require("../../../config/configHarrier");
const iamClient = new client_iam_1.IAMClient({ region: configHarrier_1.configHarrier.region });
function createInstanceProfile(roleName, instanceProfileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, check if EC2 runner instance profile already exists
            console.log(`Checking if instance profile (${instanceProfileName}) exists...`);
            yield iamClient.send(new client_iam_1.GetInstanceProfileCommand({
                InstanceProfileName: instanceProfileName,
            }));
            console.log(`Instance profile (${instanceProfileName}) already exists.`);
        }
        catch (error) {
            if (error.name === "NoSuchEntityException") {
                // Create the instance profile, if it doesn't exist
                console.log(`Instance profile (${instanceProfileName}) does not exist. Creating it...`);
                yield iamClient.send(new client_iam_1.CreateInstanceProfileCommand({
                    InstanceProfileName: instanceProfileName,
                }));
                console.log(`🚦 ***waiting for instance profile ${instanceProfileName} to PROPAGATE***`);
                yield new Promise((res) => setTimeout(res, 10000));
                console.log(`✅ Successfully created instance profile ${instanceProfileName} \n`);
            }
            else {
                console.error(`Error checking instance profile (${instanceProfileName}):`, error);
                throw new Error(`Failed to check or create instance profile: ${error}`);
            }
        }
        try {
            // Add the IAM role to the instance profile
            yield iamClient.send(new client_iam_1.AddRoleToInstanceProfileCommand({
                InstanceProfileName: instanceProfileName,
                RoleName: roleName,
            }));
            console.log(`✅ Successfully added role ${roleName} to instance profile ${instanceProfileName} \n`);
        }
        catch (error) {
            if (error.name === "LimitExceededException") {
                console.log(`Role (${roleName}) is already associated with the instance profile (${instanceProfileName}).`);
            }
            else {
                throw new Error(`❌ Error adding role ${roleName} to instance profile ${instanceProfileName}: ${error}`);
            }
        }
        return instanceProfileName;
    });
}
exports.createInstanceProfile = createInstanceProfile;
