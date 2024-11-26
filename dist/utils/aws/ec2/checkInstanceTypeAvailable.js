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
exports.findComparableInstanceType = exports.isInstanceTypeAvailable = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
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
const findComparableInstanceType = (instanceType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ec2Client = new client_ec2_1.EC2Client({ region: configHarrier_1.configHarrier.region });
        // Get available instance types in the region
        const offeringsCommand = new client_ec2_1.DescribeInstanceTypeOfferingsCommand({
            LocationType: "region",
        });
        const offeringsResponse = yield ec2Client.send(offeringsCommand);
        if (!offeringsResponse || !offeringsResponse.InstanceTypeOfferings) {
            throw new Error(`No instance types found for region!`);
        }
        const availableInstanceTypes = offeringsResponse.InstanceTypeOfferings.map(offering => offering.InstanceType);
        console.log("Available instance types in region:", availableInstanceTypes);
        // Get details about available instance types
        const detailsCommand = new client_ec2_1.DescribeInstanceTypesCommand({ InstanceTypes: availableInstanceTypes.slice(0, 90),
            Filters: [
                {
                    Name: "supported-root-device-type",
                    Values: ["ebs"], // Only instances that support EBS root devices
                },
            ],
        });
        const detailsResponse = yield ec2Client.send(detailsCommand); // Get details of all instance types
        if (!detailsResponse || !detailsResponse.InstanceTypes) {
            throw new Error(`No details found for instance types!`);
        }
        // Filter based on similar specs to instanceType
        const referenceDetails = detailsResponse.InstanceTypes.find(type => type.InstanceType === instanceType);
        if (!referenceDetails || !referenceDetails.VCpuInfo) {
            throw new Error(`Reference instance type ${instanceType} not found`);
        }
        let memoryInfo;
        const { VCpuInfo, MemoryInfo } = referenceDetails; // CPU and memery info for initially desired user instance type
        if (!MemoryInfo || !MemoryInfo.SizeInMiB) {
            throw new Error(`Memory Info for instance type ${instanceType} not found!`);
        }
        else {
            memoryInfo = MemoryInfo.SizeInMiB;
        }
        const alternatives = detailsResponse.InstanceTypes.filter(type => {
            var _a, _b, _c, _d;
            const matchesVcpu = ((_a = type.VCpuInfo) === null || _a === void 0 ? void 0 : _a.DefaultVCpus) === VCpuInfo.DefaultVCpus;
            const matchesMemory = ((((_b = type.MemoryInfo) === null || _b === void 0 ? void 0 : _b.SizeInMiB) ? type.MemoryInfo.SizeInMiB : 0) >= memoryInfo * 0.9) &&
                ((((_c = type.MemoryInfo) === null || _c === void 0 ? void 0 : _c.SizeInMiB) ? (_d = type.MemoryInfo) === null || _d === void 0 ? void 0 : _d.SizeInMiB : 0) <= memoryInfo * 2.0); // 10% less up to 200% more
            return matchesVcpu && matchesMemory;
        });
        console.log("Suitable alternatives:", alternatives.map((t) => t.InstanceType));
    }
    catch (error) {
        console.error("Error finding alternative instance type:", error);
    }
});
exports.findComparableInstanceType = findComparableInstanceType;
