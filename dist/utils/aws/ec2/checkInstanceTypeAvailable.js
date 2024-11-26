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
exports.checkInstanceTypeAvailability = exports.isInstanceTypeAvailable = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
const getAvailabilityZones_1 = require("../vpc/getAvailabilityZones");
const isInstanceTypeAvailable = (instanceType, availabilityZone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ec2Client = new client_ec2_1.EC2Client({ region: configHarrier_1.configHarrier.region });
        const command = new client_ec2_1.DescribeInstanceTypeOfferingsCommand({
            LocationType: "availability-zone",
            Filters: [
                {
                    Name: "instance-type",
                    Values: [instanceType]
                },
                {
                    Name: "location",
                    Values: [availabilityZone]
                },
            ],
        });
        const response = (yield ec2Client.send(command)).InstanceTypeOfferings;
        return response ? response.length > 0 : false;
    }
    catch (error) {
        console.error("Error checking instance type availability:", error);
        throw error;
    }
});
exports.isInstanceTypeAvailable = isInstanceTypeAvailable;
const checkInstanceTypeAvailability = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let zones = yield (0, getAvailabilityZones_1.getAvailabilityZones)();
        let instanceType = configHarrier_1.configHarrier.instanceType;
        let isAvailable = false;
        let zoneIdx = 0;
        let backupIdx = 0;
        while (!isAvailable && backupIdx <= configHarrier_1.configHarrier.backupInstanceTypes.length) {
            while (!isAvailable && zoneIdx < zones.length) {
                isAvailable = yield (0, exports.isInstanceTypeAvailable)(instanceType, zones[zoneIdx]);
                console.log(`   ${instanceType} availability in ${zones[zoneIdx]}:`, isAvailable);
                if (isAvailable) {
                    configHarrier_1.configHarrier.availabilityZone = zones[zoneIdx];
                    configHarrier_1.configHarrier.instanceType = instanceType;
                    console.log(`✅ Set Availability Zone to ${configHarrier_1.configHarrier.availabilityZone} using instance type ${configHarrier_1.configHarrier.instanceType}`);
                }
                zoneIdx++;
            }
            if (!isAvailable) {
                console.log(`   ${instanceType} not found in ${configHarrier_1.configHarrier.region} region.  Trying backup instance types...`);
                zoneIdx = 0;
                instanceType = configHarrier_1.configHarrier.backupInstanceTypes[backupIdx];
                backupIdx++;
            }
        }
        if (!isAvailable) {
            throw new Error("No known instance types found!  Check which instance types are available in your region and set your input instance type to an appropriate type!");
        }
    }
    catch (error) {
        throw new Error(`Error checking instance availability! ${error}`);
    }
});
exports.checkInstanceTypeAvailability = checkInstanceTypeAvailability;
