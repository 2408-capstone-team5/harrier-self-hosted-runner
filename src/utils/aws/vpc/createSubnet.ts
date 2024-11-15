import {
  EC2Client,
  CreateSubnetCommand,
  CreateSubnetCommandInput,
} from "@aws-sdk/client-ec2";

// import { configAWS } from "./configAWS";
import { configHarrierType } from "../../../types/typesConfig";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const createSubnet = async (
  configHarrier: configHarrierType,
  vpcId: string
) => {
  try {
    const params: CreateSubnetCommandInput = {
      VpcId: vpcId,
      CidrBlock: configHarrier.cidrBlockSubnet,
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

    // console.log("   Subnet Created ID:", response.Subnet, "\n");
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
