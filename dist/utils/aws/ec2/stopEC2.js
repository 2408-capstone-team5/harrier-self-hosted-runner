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
exports.stopInstance = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
const stopInstance = (instanceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ec2Client = new client_ec2_1.EC2Client({ region: configHarrier_1.configHarrier.region });
        const command = new client_ec2_1.StopInstancesCommand({ InstanceIds: [instanceId] });
        const response = yield ec2Client.send(command);
        console.log("   Stopping instance:", response.StoppingInstances);
    }
    catch (error) {
        console.error("❌ Error stopping instance:", error);
    }
});
exports.stopInstance = stopInstance;
