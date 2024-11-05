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

import { configAWS } from "../utils/aws/vpc/configAWS";

const ec2Client = new EC2Client(configAWS);

const setupVPC = async () => {
  const vpcId = await createVpc(configHarrier);
  console.log(`VPC ID: ${vpcId}`);
  configHarrier.vpcId = vpcId;
  await enableDNSSettings(vpcId);

  const subnetId = await createSubnet(configHarrier, vpcId);
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

  console.log("*** VPC Setup Complete ***");
};

setupVPC();
