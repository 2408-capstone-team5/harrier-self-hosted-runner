// import {
//   EC2Client,
//   ModifySubnetAttributeCommandInput,
//   ModifySubnetAttributeCommand,
// } from "@aws-sdk/client-ec2";

// Configure the EC2 client
// import { configAWS } from "./setupCredentials";
// import { configAWS } from "../utils/aws/vpc/configAWS";
import { configHarrier } from "./config";
import { createVpc } from "../utils/aws/vpc/createVPC";
import { createSubnet } from "../utils/aws/vpc/createSubnet";
import { autoAssignPublicIp } from "../utils/aws/vpc/autoAssignPublicIP";

// const ec2Client = new EC2Client(configAWS);

const setupVPC = async () => {
  const vpcId = await createVpc(configHarrier);
  console.log(`VPC ID: ${vpcId}`);

  const subnetId = await createSubnet(configHarrier, vpcId);

  await autoAssignPublicIp(subnetId);
};

setupVPC();

/* 
    Create Public Subnet
    Enable auto-assign public IPv4 address with CIDR blocks 10.0.1.0/24
    Create Internet Gateway and Attach to VPC
    Create Route Table and select our VPC
    Edit Routes => Add Route => 0.0.0.0 traffic to harrier gateway
    Associate public subnet with route table
  */
