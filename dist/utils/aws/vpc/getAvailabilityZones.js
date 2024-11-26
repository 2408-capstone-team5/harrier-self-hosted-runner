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
exports.getAvailabilityZones = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
function ensureAvailabilityZone(input) {
    if (!input) {
        throw new Error('fdggfgf');
    }
    return input;
}
const getAvailabilityZones = () => __awaiter(void 0, void 0, void 0, function* () {
    const ec2Client = new client_ec2_1.EC2Client({ region: configHarrier_1.configHarrier.region });
    try {
        const command = new client_ec2_1.DescribeAvailabilityZonesCommand({});
        const response = yield ec2Client.send(command);
        const possibleAvailabilityZones = ensureAvailabilityZone(response.AvailabilityZones);
        const availabilityZones = possibleAvailabilityZones.map((az) => az.ZoneName ? az.ZoneName : "");
        console.log(`Availability Zones in ${configHarrier_1.configHarrier.region}:`, availabilityZones);
        return availabilityZones;
    }
    catch (error) {
        console.error("Error retrieving availability zones:", error);
        throw error;
    }
});
exports.getAvailabilityZones = getAvailabilityZones;
