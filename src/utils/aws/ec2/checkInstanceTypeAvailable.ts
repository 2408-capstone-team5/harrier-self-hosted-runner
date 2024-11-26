import { EC2Client, DescribeInstanceTypeOfferingsCommand, _InstanceType } from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";
import { getAvailabilityZones } from "../vpc/getAvailabilityZones";

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


export const checkInstanceTypeAvailability = async () => {
    try {
        let zones = await getAvailabilityZones();

        let instanceType = configHarrier.instanceType;

        let isAvailable = false;
        let zoneIdx = 0;
        let backupIdx = 0;

        while (!isAvailable && backupIdx <= configHarrier.backupInstanceTypes.length) {
            while (!isAvailable && zoneIdx < zones.length) {
                isAvailable = await isInstanceTypeAvailable(instanceType, zones[zoneIdx]);
                console.log(`   ${instanceType} availability in ${zones[zoneIdx]}:`, isAvailable);
                if (isAvailable) {
                    configHarrier.availabilityZone = zones[zoneIdx];
                    configHarrier.instanceType = instanceType;
                    console.log(`✅ Set Availability Zone to ${configHarrier.availabilityZone} using instance type ${configHarrier.instanceType}`);
                }
                zoneIdx++;
            }

            if (!isAvailable) {
                console.log(`   ${instanceType} not found in ${configHarrier.region} region.  Trying backup instance types...`);
                zoneIdx = 0;
                instanceType = configHarrier.backupInstanceTypes[backupIdx];
                backupIdx++;
            }
        }

        if (!isAvailable) {
            throw new Error("No known instance types found!  Check which instance types are available in your region and set your input instance type to an appropriate type!")
        }
    } catch (error) {
        throw new Error(`Error checking instance availability! ${error}`);
    }
}