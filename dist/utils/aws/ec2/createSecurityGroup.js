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
exports.createSecurityGroup = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const installationHash_1 = require("../../../config/installationHash");
const configHarrier_1 = require("../../../config/configHarrier");
const createSecurityGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
        const securityGroupName = `harrier-${installationHash_1.installationHash}-sg`;
        const params = {
            Description: "Security group for Harrier EC2 within Harrier VPC",
            GroupName: securityGroupName,
            VpcId: configHarrier_1.configHarrier.vpcId, // Optional: If you want to specify a VPC
        };
        const command = new client_ec2_1.CreateSecurityGroupCommand(params);
        const result = yield ec2Client.send(command);
        let securityGroupId = "";
        if (result === null || result === void 0 ? void 0 : result.GroupId) {
            securityGroupId = result.GroupId;
        }
        configHarrier_1.configHarrier.securityGroupName = securityGroupName;
        configHarrier_1.configHarrier.securityGroupIds = [securityGroupId];
        console.log("   Security group created:", securityGroupId);
    }
    catch (error) {
        console.error("❌ Error creating security group:", error);
    }
});
exports.createSecurityGroup = createSecurityGroup;
