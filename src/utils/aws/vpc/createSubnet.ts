import {
  EC2Client,
  CreateSubnetCommand,
  CreateSubnetCommandInput,
} from "@aws-sdk/client-ec2";

import { configAWS } from "./configAWS";
import { configHarrierType } from "../../../types/typesConfig";

const ec2Client = new EC2Client(configAWS);

export const createSubnet = async (
  configHarrier: configHarrierType,
  vpcId: string,
): Promise<string> => {
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

    console.log("Subnet Created ID:", response.Subnet);

    if (!response.Subnet || !response.Subnet.SubnetId) {
      throw new Error("Subnet Creation Failed!");
    } else {
      return response.Subnet.SubnetId;
    }
  } catch (error) {
    throw new Error(`Error creating subnet! ${configHarrier.cidrBlockSubnet}`);
  }
};
