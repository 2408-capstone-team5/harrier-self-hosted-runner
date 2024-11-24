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
exports.describeEC2s = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const describeEC2s = (instanceId) => __awaiter(void 0, void 0, void 0, function* () {
    const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
    const params = { InstanceIds: [instanceId] };
    const describeInstancesCommand = new client_ec2_1.DescribeInstancesCommand(params);
    const instanceDetails = yield ec2Client.send(describeInstancesCommand);
    if ((instanceDetails === null || instanceDetails === void 0 ? void 0 : instanceDetails.Reservations) &&
        instanceDetails.Reservations[0].Instances) {
        console.log("Instance details:", instanceDetails.Reservations[0].Instances[0]);
    }
});
exports.describeEC2s = describeEC2s;
