import {
  EC2Client,
  // DescribeVpcsCommand,
  DescribeSubnetsCommand,
  DeleteSubnetCommand,
  DescribeInternetGatewaysCommand,
  DetachInternetGatewayCommand,
  DeleteInternetGatewayCommand,
  DescribeRouteTablesCommand,
  DeleteRouteTableCommand,
  DeleteVpcCommand,
} from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({ region: "us-east-1" });

async function cleanupVpcResources(vpcName: string) {
  try {
    // 1. Describe Subnets to find the ones in the VPC and delete
    const { Subnets } = await ec2Client.send(
      new DescribeSubnetsCommand({
        Filters: [{ Name: "tag:Name", Values: [vpcName] }],
      })
    );

    if (Subnets) {
      for (const subnet of Subnets) {
        console.log(`Deleting subnet: ${subnet.SubnetId}`);
        await ec2Client.send(
          new DeleteSubnetCommand({ SubnetId: subnet.SubnetId })
        );
      }
    }

    // 2. Describe and detach the Internet Gateway if attached
    const { InternetGateways } = await ec2Client.send(
      new DescribeInternetGatewaysCommand({
        Filters: [{ Name: "tag:Name", Values: [vpcName] }],
      })
    );

    if (InternetGateways) {
      for (const igw of InternetGateways) {
        console.log(
          `Detaching and deleting Internet Gateway: ${igw.InternetGatewayId}`
        );
        await ec2Client.send(
          new DetachInternetGatewayCommand({
            InternetGatewayId: igw.InternetGatewayId,
            VpcId: vpcId,
          })
        );
        await ec2Client.send(
          new DeleteInternetGatewayCommand({
            InternetGatewayId: igw.InternetGatewayId,
          })
        );
      }
    }

    // 3. Describe and delete any route tables (except default)
    const { RouteTables } = await ec2Client.send(
      new DescribeRouteTablesCommand({
        Filters: [{ Name: "tag:Name", Values: [vpcName] }],
      })
    );

    if (RouteTables) {
      for (const routeTable of RouteTables) {
        if (!routeTable.Associations?.some((assoc) => assoc.Main)) {
          // Avoid deleting default route table
          console.log(
            `Deleting custom route table: ${routeTable.RouteTableId}`
          );
          await ec2Client.send(
            new DeleteRouteTableCommand({
              RouteTableId: routeTable.RouteTableId,
            })
          );
        }
      }
    }

    // 5. Finally, delete the VPC
    console.log(`Deleting VPC: ${vpcId}`);
    await ec2Client.send(new DeleteVpcCommand({ VpcId: vpcId }));
    console.log(`VPC ${vpcId} deleted successfully.`);
  } catch (error) {
    console.error("Error during VPC cleanup:", error);
  }
}

// Example usage
const vpcId = "vpc-xxxxxxxx"; // Replace with your VPC ID
void cleanupVpcResources(vpcId);
