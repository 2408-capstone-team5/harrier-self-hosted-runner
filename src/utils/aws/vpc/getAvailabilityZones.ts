import { EC2Client, DescribeAvailabilityZonesCommand, AvailabilityZone } from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";

function ensureAvailabilityZone(input: AvailabilityZone[] | undefined): AvailabilityZone[] {
    if(!input) {
        throw new Error('fdggfgf');
    }
    return input;
}

export const getAvailabilityZones = async (): Promise<string[]> => {
  try {
    const ec2Client = new EC2Client({ region: configHarrier.region });

    const command = new DescribeAvailabilityZonesCommand({});
    const response = await ec2Client.send(command);

    const possibleAvailabilityZones = ensureAvailabilityZone(response.AvailabilityZones);

    const availabilityZones = possibleAvailabilityZones.map((az: AvailabilityZone) => az.ZoneName ? az.ZoneName : "");

    console.log(`   Availability Zones in ${configHarrier.region}:`, availabilityZones);
    return availabilityZones;
  } catch (error) {
    console.error("Error retrieving availability zones:", error);
    throw error;
  }
};