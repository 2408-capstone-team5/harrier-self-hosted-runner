import {
  EC2Client,
  CreateInternetGatewayCommand,
  CreateInternetGatewayCommandOutput,
} from "@aws-sdk/client-ec2";

import { configAWS } from "./configAWS";

const ec2Client = new EC2Client(configAWS);

export const createInternetGateway = async (): Promise<string> => {
  try {
    const command = new CreateInternetGatewayCommand({});
    const response: CreateInternetGatewayCommandOutput =
      await ec2Client.send(command);

    if (
      !response.InternetGateway ||
      !response.InternetGateway.InternetGatewayId
    ) {
      throw new Error("Internet Gateway Creation Failed!");
    }

    console.log(
      "Internet Gateway Created:",
      response.InternetGateway.InternetGatewayId,
    );
    return response.InternetGateway.InternetGatewayId;
  } catch (error) {
    throw new Error(`Error creating Internet Gateway: ${error}`);
  }
};