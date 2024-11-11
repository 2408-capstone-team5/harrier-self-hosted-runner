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
exports.createInternetGateway = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// import { configAWS } from "./configAWS";
const configHarrier_1 = require("../../../config/configHarrier");
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const createInternetGateway = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            TagSpecifications: [
                {
                    ResourceType: "internet-gateway",
                    Tags: [{ Key: "Name", Value: configHarrier_1.configHarrier.tagValue }],
                },
            ],
        };
        const command = new client_ec2_1.CreateInternetGatewayCommand(params);
        const response = yield ec2Client.send(command);
        if (!response.InternetGateway ||
            !response.InternetGateway.InternetGatewayId) {
            throw new Error("Internet Gateway Creation Failed!");
        }
        console.log(`Internet Gateway Created: ${response.InternetGateway.InternetGatewayId}  VPC Id: ${configHarrier_1.configHarrier.vpcId}`);
        return response.InternetGateway.InternetGatewayId;
    }
    catch (error) {
        throw new Error(`Error creating Internet Gateway: ${error}`);
    }
});
exports.createInternetGateway = createInternetGateway;
