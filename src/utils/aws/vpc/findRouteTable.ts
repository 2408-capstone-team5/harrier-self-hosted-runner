import {
  EC2Client,
  DescribeRouteTablesCommand,
  DescribeRouteTablesCommandInput,
} from "@aws-sdk/client-ec2";

// import { configAWS } from "./configAWS";dsxdscfxf

const ec2Client = new EC2Client({ region: "us-east-1" });

export const findRouteTableId = async (vpcId: string): Promise<string> => {
  try {
    const params: DescribeRouteTablesCommandInput = {
      Filters: [
        {
          Name: "vpc-id",
          Values: [vpcId],
        },
      ],
    };

    const command = new DescribeRouteTablesCommand(params);
    const response = await ec2Client.send(command);

    const routeTable = response.RouteTables?.[0]; // Assumes that we only have 1 route table setup
    if (!routeTable || !routeTable.RouteTableId) {
      throw new Error("Route Table not found for the VPC!");
    }

    console.log("   Route Table ID:", routeTable.RouteTableId);
    return routeTable.RouteTableId;
  } catch (error) {
    throw new Error(`Error finding Route Table: ${error}`);
  }
};
