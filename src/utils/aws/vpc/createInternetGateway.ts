import {
  EC2Client,
  CreateInternetGatewayCommand,
  CreateInternetGatewayCommandOutput,
  CreateInternetGatewayCommandInput,
} from "@aws-sdk/client-ec2";

// import { configAWS } from "./configAWS";
import { configHarrier } from "../../../config/configHarrier";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const createInternetGateway = async (): Promise<string> => {
  try {
    const params: CreateInternetGatewayCommandInput = {
      TagSpecifications: [
        {
          ResourceType: "internet-gateway",
          Tags: [{ Key: "Name", Value: configHarrier.tagValue }],
        },
      ],
    };

    const command = new CreateInternetGatewayCommand(params);
    const response: CreateInternetGatewayCommandOutput =
      await ec2Client.send(command);

    if (
      !response.InternetGateway ||
      !response.InternetGateway.InternetGatewayId
    ) {
      throw new Error("Internet Gateway Creation Failed!");
    }

    console.log(
      `   Internet Gateway Created: ${response.InternetGateway.InternetGatewayId}  VPC Id: ${configHarrier.vpcId}`
    );
    return response.InternetGateway.InternetGatewayId;
  } catch (error: unknown) {
    throw new Error(`Error creating Internet Gateway: ${error}`);
  }
};
