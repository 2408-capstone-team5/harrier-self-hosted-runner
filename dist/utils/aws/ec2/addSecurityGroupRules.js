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
exports.addSecurityGroupRules = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
const addSecurityGroupRules = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
        const params = {
            GroupId: configHarrier_1.configHarrier.securityGroupIds[0],
            IpPermissions: [
                {
                    IpProtocol: "tcp",
                    FromPort: 22,
                    ToPort: 22,
                    IpRanges: [
                        {
                            CidrIp: "0.0.0.0/0",
                            Description: "SSH access",
                        },
                    ],
                },
                {
                    IpProtocol: "tcp",
                    FromPort: 443,
                    ToPort: 443,
                    IpRanges: [
                        {
                            CidrIp: "0.0.0.0/0",
                            Description: "HTTPS access",
                        },
                    ],
                },
            ],
        };
        const addIngressCommand = new client_ec2_1.AuthorizeSecurityGroupIngressCommand(params);
        yield ec2Client.send(addIngressCommand);
        // const result = await ec2Client.send(addIngressCommand);
        console.log("   Security group rules added for SSH and HTTPS\n");
        // console.log("*** Security group rules for SSH and HTTPS addes:", result);
    }
    catch (error) {
        console.log("Error adding security ingress rules:", error);
    }
});
exports.addSecurityGroupRules = addSecurityGroupRules;
