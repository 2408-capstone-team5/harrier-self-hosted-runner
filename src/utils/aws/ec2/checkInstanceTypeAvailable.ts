import { EC2Client, DescribeInstanceTypeOfferingsCommand, DescribeInstanceTypesCommand, _InstanceType } from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";

export const isInstanceTypeAvailable = async(instanceType: string,
  availabilityZone: string):Promise<boolean> => {
    try {
        const ec2Client = new EC2Client({ region: configHarrier.region });
        const command = new DescribeInstanceTypeOfferingsCommand({
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

        const response = (await ec2Client.send(command)).InstanceTypeOfferings;

        return response ? response.length > 0 : false;
    } catch (error) {
        console.error("Error checking instance type availability:", error);
        throw error;
    }
}

export const findComparableInstanceType = async (instanceType: string): Promise<void>=> {
    try {
        const ec2Client = new EC2Client({ region: configHarrier.region });

        // Get available instance types in the region
        const offeringsCommand = new DescribeInstanceTypeOfferingsCommand({
        LocationType: "region",
        });
        const offeringsResponse = await ec2Client.send(offeringsCommand);

        if (!offeringsResponse || !offeringsResponse.InstanceTypeOfferings) {
            throw new Error(`No instance types found for region!`);
        }

        const availableInstanceTypes: _InstanceType[] = offeringsResponse.InstanceTypeOfferings.map(offering => offering.InstanceType as _InstanceType);
        console.log("Available instance types in region:", availableInstanceTypes);

        // Get details about available instance types
        const detailsCommand = new DescribeInstanceTypesCommand({ InstanceTypes: availableInstanceTypes.slice(0, 90),
             Filters: [
                        {
                        Name: "supported-root-device-type",
                        Values: ["ebs"], // Only instances that support EBS root devices
                        },
                    ],
         });
        const detailsResponse = await ec2Client.send(detailsCommand);  // Get details of all instance types

        if (!detailsResponse || !detailsResponse.InstanceTypes) {
            throw new Error(`No details found for instance types!`);
        }

        // Filter based on similar specs to instanceType
        const referenceDetails = detailsResponse.InstanceTypes.find(type => type.InstanceType === instanceType);
        if (!referenceDetails || !referenceDetails.VCpuInfo) {
            throw new Error(`Reference instance type ${instanceType} not found`);
        }

        let memoryInfo: number;
        const { VCpuInfo, MemoryInfo } = referenceDetails; // CPU and memery info for initially desired user instance type
        if (!MemoryInfo || !MemoryInfo.SizeInMiB) {
            throw new Error(`Memory Info for instance type ${instanceType} not found!`);
        } else {
            memoryInfo = MemoryInfo.SizeInMiB
        }

        const alternatives = detailsResponse.InstanceTypes.filter(type => {
            const matchesVcpu = type.VCpuInfo?.DefaultVCpus === VCpuInfo.DefaultVCpus;
            const matchesMemory = 
                ((type.MemoryInfo?.SizeInMiB ? type.MemoryInfo.SizeInMiB : 0) >= memoryInfo * 0.9) &&
                ((type.MemoryInfo?.SizeInMiB ? type.MemoryInfo?.SizeInMiB : 0) <= memoryInfo * 2.0); // 10% less up to 200% more
            return matchesVcpu && matchesMemory;
        });

    console.log("Suitable alternatives:", alternatives.map((t) => t.InstanceType));
    } catch (error) {
        console.error("Error finding alternative instance type:", error);
    }
}