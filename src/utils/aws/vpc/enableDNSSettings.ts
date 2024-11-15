import {
  EC2Client,
  ModifyVpcAttributeCommand,
  ModifyVpcAttributeCommandInput,
} from "@aws-sdk/client-ec2";

// import { configAWS } from "./configAWS";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const enableDNSSettings = async (vpcId: string): Promise<void> => {
  try {
    const params: ModifyVpcAttributeCommandInput = {
      VpcId: vpcId,
      EnableDnsSupport: { Value: true },
    };
    const command = new ModifyVpcAttributeCommand(params);
    await ec2Client.send(command);
    console.log(`   DNS Resolution enabled for VPC ${vpcId}`);
  } catch (error) {
    throw new Error(`Error enabling DNS Resolution: ${error}`);
  }

  try {
    const params: ModifyVpcAttributeCommandInput = {
      VpcId: vpcId,
      EnableDnsHostnames: { Value: true },
    };
    const command = new ModifyVpcAttributeCommand(params);
    await ec2Client.send(command);
    console.log(`   DNS Hostnames enabled for VPC ${vpcId}\n`);
  } catch (error) {
    throw new Error(`Error enabling DNS Hostnames: ${error}`);
  }
};
