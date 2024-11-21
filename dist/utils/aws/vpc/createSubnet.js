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
exports.createSubnet = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const createSubnet = (configHarrier, vpcId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = {
            VpcId: vpcId,
            CidrBlock: configHarrier.cidrBlockSubnet,
            TagSpecifications: [
                {
                    ResourceType: "subnet",
                    Tags: [
                        {
                            Key: "Name",
                            Value: configHarrier.tagValue,
                        },
                    ],
                },
            ],
        };
        const command = new client_ec2_1.CreateSubnetCommand(params);
        const response = yield ec2Client.send(command);
        // console.log("   Subnet Created ID:", response.Subnet, "\n");
        console.log("   Subnet Created ID:", (_a = response.Subnet) === null || _a === void 0 ? void 0 : _a.SubnetId, "\n");
        if (!response.Subnet || !response.Subnet.SubnetId) {
            throw new Error("Subnet Creation Failed!");
        }
        return response.Subnet.SubnetId;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error:", error.message, "\n");
            return;
        }
        else {
            throw new Error(`Error creating subnet! ${configHarrier.cidrBlockSubnet}`);
        }
    }
});
exports.createSubnet = createSubnet;
