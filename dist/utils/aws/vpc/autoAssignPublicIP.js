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
exports.autoAssignPublicIp = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// import { configAWS } from "./configAWS";
// import { configHarrier } from "../../../services/config";
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const autoAssignPublicIp = (subnetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            SubnetId: subnetId,
            MapPublicIpOnLaunch: { Value: true }, // Enable auto-assign public IPv4
        };
        const command = new client_ec2_1.ModifySubnetAttributeCommand(params);
        yield ec2Client.send(command); // Returns empty {} on success or throws reject error if fails
        console.log("   Auto-assign public IPv4 enabled for Subnet:", subnetId, "\n");
    }
    catch (error) {
        throw new Error(`Error enabling auto-assign public IPv4 on ${subnetId}: ${error}`);
    }
});
exports.autoAssignPublicIp = autoAssignPublicIp;
