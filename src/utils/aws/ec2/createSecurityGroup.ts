import { EC2Client, CreateSecurityGroupCommand } from "@aws-sdk/client-ec2";
import { installationHash } from "../../../config/installationHash";
import { configHarrier } from "../../../config/configHarrier";

export const createSecurityGroup = async () => {
  try {
    const ec2Client = new EC2Client({ region: "us-east-1" });
    const securityGroupName = `harrier-${installationHash}-sg`;
    const params = {
      Description: "Security group for Harrier EC2 within Harrier VPC",
      GroupName: securityGroupName,
      VpcId: configHarrier.vpcId, // Optional: If you want to specify a VPC
    };

    const command = new CreateSecurityGroupCommand(params);
    const result = await ec2Client.send(command);

    let securityGroupId = "";

    if (result?.GroupId) {
      securityGroupId = result.GroupId;
    }

    configHarrier.securityGroupName = securityGroupName;
    configHarrier.securityGroupIds = [securityGroupId];

    console.log("   Security group created:", securityGroupId);
  } catch (error) {
    console.error("❌ Error creating security group:", error);
  }
};
