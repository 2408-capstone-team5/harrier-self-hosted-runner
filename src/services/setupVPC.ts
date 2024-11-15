import { EC2Client, CreateTagsCommand } from "@aws-sdk/client-ec2";

import { configHarrier } from "../config/configHarrier";
import { createVpc } from "../utils/aws/vpc/createVPC";
import { createSubnet } from "../utils/aws/vpc/createSubnet";
import { autoAssignPublicIp } from "../utils/aws/vpc/autoAssignPublicIP";
import { createInternetGateway } from "../utils/aws/vpc/createInternetGateway";
import { attachInternetGateway } from "../utils/aws/vpc/attachInternetGateway";
import { findRouteTableId } from "../utils/aws/vpc/findRouteTable";
import { createRoute } from "../utils/aws/vpc/createRoute";
import { enableDNSSettings } from "../utils/aws/vpc/enableDNSSettings";

// import { configAWS } from "../utils/aws/vpc/configAWS";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const setupVPC = async () => {
  try {
    console.log("** Starting setupVPC...");
    // console.log(configHarrier);

    const vpcId = await createVpc(configHarrier);
    if (!vpcId) {
      throw new Error("Failed to return VPC ID");
    }
    console.log(`   VPC ID: ${vpcId}`);
    configHarrier.vpcId = vpcId;
    await enableDNSSettings(vpcId);

    const subnetId = await createSubnet(configHarrier, vpcId);
    if (!subnetId) {
      throw new Error("Failed to return subnet ID");
    }
    configHarrier.subnetId = subnetId;
    await autoAssignPublicIp(subnetId);

    const gatewayId = await createInternetGateway();

    await attachInternetGateway(gatewayId, vpcId);

    const routeTableId = await findRouteTableId(vpcId);
    if (!routeTableId) {
      throw new Error("Failed to find Route Table for the VPC!!");
    }
    const command = new CreateTagsCommand({
      Resources: [routeTableId],
      Tags: [{ Key: "Name", Value: configHarrier.tagValue }],
    });
    await ec2Client.send(command); // Add tag to route table that was already out there

    await createRoute(routeTableId, gatewayId);

    console.log("✅ Successfully completed VPC Setup\n");
    // console.log(configHarrier);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
    } else {
      throw new Error(`Error setting up VPC!`);
    }
  }
};

// setupVPC();
