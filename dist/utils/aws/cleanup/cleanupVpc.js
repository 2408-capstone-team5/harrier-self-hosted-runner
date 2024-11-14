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
exports.cleanupVpc = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// Create EC2 client
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" }); // Replace with your region
// Find all VPCs whose name starts with "Harrier"
const findVpcsWithNamePrefix = (prefix) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.DescribeVpcsCommand({});
    const response = yield ec2Client.send(command);
    const harrierVpcIds = [];
    if (response === null || response === void 0 ? void 0 : response.Vpcs) {
        response.Vpcs.filter((vpc) => {
            var _a, _b;
            const nameTag = (_a = vpc.Tags) === null || _a === void 0 ? void 0 : _a.find((tag) => tag.Key === "Name");
            return nameTag && ((_b = nameTag.Value) === null || _b === void 0 ? void 0 : _b.startsWith(prefix));
        }).forEach((vpc) => {
            if (vpc.VpcId) {
                harrierVpcIds.push(vpc.VpcId);
            }
        });
    }
    return harrierVpcIds;
});
// Delete subnets associated with VPC
const deleteSubnets = (vpcId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.DescribeSubnetsCommand({
        Filters: [
            {
                Name: "vpc-id",
                Values: [vpcId],
            },
        ],
    });
    const response = yield ec2Client.send(command);
    const subnets = response.Subnets;
    if (!subnets) {
        console.log("No subnets found.");
        return;
    }
    for (const subnet of subnets) {
        try {
            const deleteSubnetCommand = new client_ec2_1.DeleteSubnetCommand({
                SubnetId: subnet.SubnetId,
            });
            yield ec2Client.send(deleteSubnetCommand);
            console.log(`Subnet ${subnet.SubnetId} deleted.`);
        }
        catch (error) {
            console.error(`Failed to delete subnet ${subnet.SubnetId}:`, error);
        }
    }
});
// Delete Internet Gateways associated with VPC
const deleteInternetGateways = (vpcId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.DescribeInternetGatewaysCommand({
        Filters: [
            {
                Name: "attachment.vpc-id",
                Values: [vpcId],
            },
        ],
    });
    const response = yield ec2Client.send(command);
    const internetGateways = response.InternetGateways;
    if (!internetGateways) {
        console.log("No internet gateways found.");
        return;
    }
    for (const igw of internetGateways) {
        try {
            // Detach Internet Gateway first
            const detachCommand = new client_ec2_1.DetachInternetGatewayCommand({
                InternetGatewayId: igw.InternetGatewayId,
                VpcId: vpcId,
            });
            yield ec2Client.send(detachCommand);
            console.log(`Internet Gateway ${igw.InternetGatewayId} detached.`);
            // Then delete the Internet Gateway
            const deleteCommand = new client_ec2_1.DeleteInternetGatewayCommand({
                InternetGatewayId: igw.InternetGatewayId,
            });
            yield ec2Client.send(deleteCommand);
            console.log(`Internet Gateway ${igw.InternetGatewayId} deleted.`);
        }
        catch (error) {
            console.error(`Failed to delete Internet Gateway ${igw.InternetGatewayId}:`, error);
        }
    }
});
// Delete VPC and its associated resources
const deleteVpcAndResources = (vpcId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete associated subnets, internet gateways
        yield deleteSubnets(vpcId);
        yield deleteInternetGateways(vpcId);
        // Finally, delete the VPC
        const deleteVpcCommand = new client_ec2_1.DeleteVpcCommand({
            VpcId: vpcId,
        });
        yield ec2Client.send(deleteVpcCommand);
        console.log(`VPC ${vpcId} deleted.`);
    }
    catch (error) {
        console.error(`Failed to delete VPC ${vpcId}:`, error);
    }
});
// Main function to process all VPCs with name starting with "Harrier"
const cleanupVpc = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Start VPC cleanup");
        const vpcs = yield findVpcsWithNamePrefix("harrier");
        if (vpcs.length === 0) {
            console.log('No VPCs found with the prefix "harrier".');
            return;
        }
        for (const vpc of vpcs) {
            console.log(`Processing VPC: ${vpc}`);
            // Delete the VPC and its resources
            yield deleteVpcAndResources(vpc);
        }
        console.log("*** VPC cleanup complete ***");
    }
    catch (error) {
        console.error("Error processing VPCs:", error);
    }
});
exports.cleanupVpc = cleanupVpc;
