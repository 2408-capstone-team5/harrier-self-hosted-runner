import {
  EC2Client,
  CreateVpcCommand,
  CreateVpcCommandInput,
} from "@aws-sdk/client-ec2";

import { configHarrierType } from "../../../types/typesConfig";
import { configHarrier } from "../../../config/configHarrier";

const ec2Client = new EC2Client({ region: configHarrier.region });

export const createVpc = async (configHarrier: configHarrierType) => {
  try {
    const params: CreateVpcCommandInput = {
      CidrBlock: configHarrier.cidrBlockVPC,
      TagSpecifications: [
        {
          ResourceType: "vpc",
          Tags: [
            {
              Key: "Name",
              Value: configHarrier.tagValue,
            },
          ],
        },
      ],
    };

    const command = new CreateVpcCommand(params);
    const response = await ec2Client.send(command);

    console.log("✅ Successfully Created VPC\n");

    if (!response.Vpc?.VpcId) {
      throw new Error("VPC Creation Failed!");
    }
    return response.Vpc.VpcId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
      return;
    } else {
      throw new Error("VPC Creation Failed!");
    }
  }
};
