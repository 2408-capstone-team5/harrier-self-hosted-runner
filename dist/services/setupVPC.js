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
exports.setupVPC = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../config/configHarrier");
const createVPC_1 = require("../utils/aws/vpc/createVPC");
const createSubnet_1 = require("../utils/aws/vpc/createSubnet");
const autoAssignPublicIP_1 = require("../utils/aws/vpc/autoAssignPublicIP");
const createInternetGateway_1 = require("../utils/aws/vpc/createInternetGateway");
const attachInternetGateway_1 = require("../utils/aws/vpc/attachInternetGateway");
const findRouteTable_1 = require("../utils/aws/vpc/findRouteTable");
const createRoute_1 = require("../utils/aws/vpc/createRoute");
const enableDNSSettings_1 = require("../utils/aws/vpc/enableDNSSettings");
// import { configAWS } from "../utils/aws/vpc/configAWS";
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const setupVPC = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Starting setupVPC...");
        // console.log(configHarrier);
        const vpcId = yield (0, createVPC_1.createVpc)(configHarrier_1.configHarrier);
        if (!vpcId) {
            throw new Error("Failed to return VPC ID");
        }
        console.log(`   VPC ID: ${vpcId}`);
        configHarrier_1.configHarrier.vpcId = vpcId;
        yield (0, enableDNSSettings_1.enableDNSSettings)(vpcId);
        const subnetId = yield (0, createSubnet_1.createSubnet)(configHarrier_1.configHarrier, vpcId);
        if (!subnetId) {
            throw new Error("Failed to return subnet ID");
        }
        configHarrier_1.configHarrier.subnetId = subnetId;
        yield (0, autoAssignPublicIP_1.autoAssignPublicIp)(subnetId);
        const gatewayId = yield (0, createInternetGateway_1.createInternetGateway)();
        yield (0, attachInternetGateway_1.attachInternetGateway)(gatewayId, vpcId);
        const routeTableId = yield (0, findRouteTable_1.findRouteTableId)(vpcId);
        if (!routeTableId) {
            throw new Error("Failed to find Route Table for the VPC!!");
        }
        const command = new client_ec2_1.CreateTagsCommand({
            Resources: [routeTableId],
            Tags: [{ Key: "Name", Value: configHarrier_1.configHarrier.tagValue }],
        });
        yield ec2Client.send(command); // Add tag to route table that was already out there
        yield (0, createRoute_1.createRoute)(routeTableId, gatewayId);
        console.log("✅ Successfully completed VPC Setup\n");
        // console.log(configHarrier);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error:", error.message, "\n");
        }
        else {
            throw new Error(`Error setting up VPC!`);
        }
    }
});
exports.setupVPC = setupVPC;
// setupVPC();
