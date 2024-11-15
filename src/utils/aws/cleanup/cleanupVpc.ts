import {
  EC2Client,
  DescribeVpcsCommand,
  DescribeSubnetsCommand,
  DescribeInternetGatewaysCommand,
  DeleteVpcCommand,
  DeleteSubnetCommand,
  DetachInternetGatewayCommand,
  DeleteInternetGatewayCommand,
} from "@aws-sdk/client-ec2";

// Create EC2 client
const ec2Client = new EC2Client({ region: "us-east-1" }); // Replace with your region

// Find all VPCs whose name starts with "Harrier"
const findVpcsWithNamePrefix = async (prefix: string) => {
  const command = new DescribeVpcsCommand({});
  const response = await ec2Client.send(command);

  const harrierVpcIds: string[] = [];

  if (response?.Vpcs) {
    response.Vpcs.filter((vpc) => {
      const nameTag = vpc.Tags?.find((tag) => tag.Key === "Name");
      return nameTag && nameTag.Value?.startsWith(prefix);
    }).forEach((vpc) => {
      if (vpc.VpcId) {
        harrierVpcIds.push(vpc.VpcId);
      }
    });
  }

  return harrierVpcIds;
};

// Delete subnets associated with VPC
const deleteSubnets = async (vpcId: string) => {
  const command = new DescribeSubnetsCommand({
    Filters: [
      {
        Name: "vpc-id",
        Values: [vpcId],
      },
    ],
  });

  const response = await ec2Client.send(command);
  const subnets = response.Subnets;

  if (!subnets) {
    console.log("   No subnets found.");
    return;
  }

  for (const subnet of subnets) {
    try {
      const deleteSubnetCommand = new DeleteSubnetCommand({
        SubnetId: subnet.SubnetId,
      });
      await ec2Client.send(deleteSubnetCommand);
      console.log(`   Subnet ${subnet.SubnetId} deleted.`);
    } catch (error) {
      console.error(`❌ Error deleting subnet ${subnet.SubnetId}:`, error);
    }
  }
};

// Delete Internet Gateways associated with VPC
const deleteInternetGateways = async (vpcId: string) => {
  const command = new DescribeInternetGatewaysCommand({
    Filters: [
      {
        Name: "attachment.vpc-id",
        Values: [vpcId],
      },
    ],
  });

  const response = await ec2Client.send(command);
  const internetGateways = response.InternetGateways;

  if (!internetGateways) {
    console.log("   No internet gateways found.");
    return;
  }

  for (const igw of internetGateways) {
    try {
      // Detach Internet Gateway first
      const detachCommand = new DetachInternetGatewayCommand({
        InternetGatewayId: igw.InternetGatewayId,
        VpcId: vpcId,
      });
      await ec2Client.send(detachCommand);
      console.log(`   Internet Gateway ${igw.InternetGatewayId} detached.`);

      // Then delete the Internet Gateway
      const deleteCommand = new DeleteInternetGatewayCommand({
        InternetGatewayId: igw.InternetGatewayId,
      });
      await ec2Client.send(deleteCommand);
      console.log(`   Internet Gateway ${igw.InternetGatewayId} deleted.`);
    } catch (error) {
      console.error(
        `❌ Error deleting Internet Gateway ${igw.InternetGatewayId}:`,
        error
      );
    }
  }
};

// Delete VPC and its associated resources
const deleteVpcAndResources = async (vpcId: string) => {
  try {
    // Delete associated subnets, internet gateways
    await deleteSubnets(vpcId);
    await deleteInternetGateways(vpcId);

    // Finally, delete the VPC
    const deleteVpcCommand = new DeleteVpcCommand({
      VpcId: vpcId,
    });
    await ec2Client.send(deleteVpcCommand);
    console.log(`   VPC ${vpcId} deleted.`);
  } catch (error) {
    console.error(`❌ Error deleting VPC ${vpcId}:`, error);
  }
};

// Main function to process all VPCs with name starting with "Harrier"
export const cleanupVpc = async () => {
  try {
    console.log("** Start VPC cleanup");

    const vpcs = await findVpcsWithNamePrefix("harrier");
    if (vpcs.length === 0) {
      console.log('   No VPCs found with the prefix "harrier".');
    } else {
      for (const vpc of vpcs) {
        console.log(`   Processing VPC: ${vpc}`);

        // Delete the VPC and its resources
        await deleteVpcAndResources(vpc);
      }
    }

    console.log("✅ Successfully completed VPC cleanup.\n");
  } catch (error) {
    console.error("❌ Error processing VPCs:", error, "\n");
  }
};
