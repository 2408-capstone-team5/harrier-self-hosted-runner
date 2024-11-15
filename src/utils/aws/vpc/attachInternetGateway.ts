import {
  EC2Client,
  AttachInternetGatewayCommand,
  AttachInternetGatewayCommandInput,
} from "@aws-sdk/client-ec2";
// import { configAWS } from "./configAWS";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const attachInternetGateway = async (
  internetGatewayId: string,
  vpcId: string
): Promise<void> => {
  try {
    const internetGatewayParams: AttachInternetGatewayCommandInput = {
      InternetGatewayId: internetGatewayId,
      VpcId: vpcId,
    };

    const command = new AttachInternetGatewayCommand(internetGatewayParams);
    await ec2Client.send(command); // Returned empty object {} on success, throws error on failure

    console.log(
      `   Internet Gateway ${internetGatewayId} attached to VPC ${vpcId}\n`
    );
  } catch (error) {
    throw new Error(`Error attaching Internet Gateway to VPC: ${error}`);
  }
};
