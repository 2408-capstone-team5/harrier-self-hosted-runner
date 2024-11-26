import {
  EC2Client,
  CreateSubnetCommand,
  CreateSubnetCommandInput,
} from "@aws-sdk/client-ec2";

import { configHarrierType } from "../../../types/typesConfig";
import { configHarrier } from "../../../config/configHarrier";

const ec2Client = new EC2Client({ region: configHarrier.region });

export const createSubnet = async (
  configHarrier: configHarrierType,
  vpcId: string
) => {
  try {
    const params: CreateSubnetCommandInput = {
      VpcId: vpcId,
      CidrBlock: configHarrier.cidrBlockSubnet,
      AvailabilityZone: configHarrier.availabilityZone,
      TagSpecifications: [
        {
          ResourceType: "subnet",
          Tags: [
            {
              Key: "Name",
              Value: configHarrier.tagValue,
            },
          ],
        },
      ],
    };

    const command = new CreateSubnetCommand(params);
    const response = await ec2Client.send(command);

    console.log("   Subnet Created ID:", response.Subnet?.SubnetId, "\n");

    if (!response.Subnet || !response.Subnet.SubnetId) {
      throw new Error("Subnet Creation Failed!");
    }
    return response.Subnet.SubnetId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
      return;
    } else {
      throw new Error(
        `Error creating subnet! ${configHarrier.cidrBlockSubnet}`
      );
    }
  }
};
