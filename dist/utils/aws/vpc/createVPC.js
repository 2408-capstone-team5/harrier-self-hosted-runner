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
exports.createVpc = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// import { configHarrier } from "../../../services/config";
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const createVpc = (configHarrier) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = {
            CidrBlock: configHarrier.cidrBlockVPC,
            TagSpecifications: [
                {
                    ResourceType: "vpc",
                    Tags: [
                        {
                            Key: "Name",
                            Value: configHarrier.tagValue,
                        },
                    ],
                },
            ],
        };
        const command = new client_ec2_1.CreateVpcCommand(params);
        const response = yield ec2Client.send(command);
        console.log("VPC Created:", response.Vpc);
        if (!((_a = response.Vpc) === null || _a === void 0 ? void 0 : _a.VpcId)) {
            throw new Error("VPC Creation Failed!");
        }
        return response.Vpc.VpcId;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return;
        }
        else {
            throw new Error("VPC Creation Failed!");
        }
    }
});
exports.createVpc = createVpc;
