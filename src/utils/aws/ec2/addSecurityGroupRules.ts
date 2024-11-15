import {
  EC2Client,
  AuthorizeSecurityGroupIngressCommand,
} from "@aws-sdk/client-ec2";
import { configHarrier } from "../../../config/configHarrier";

export const addSecurityGroupRules = async () => {
  try {
    const ec2Client = new EC2Client({ region: "us-east-1" });

    const params = {
      GroupId: configHarrier.securityGroupIds[0], // Replace with your security group ID
      IpPermissions: [
        {
          IpProtocol: "tcp",
          FromPort: 22, // Port for SSH
          ToPort: 22,
          IpRanges: [
            {
              CidrIp: "0.0.0.0/0", // Allow SSH from anywhere (use more restrictive CIDR in production)
              Description: "SSH access",
            },
          ],
        },
        {
          IpProtocol: "tcp",
          FromPort: 443, // Port for HTTPS
          ToPort: 443,
          IpRanges: [
            {
              CidrIp: "0.0.0.0/0", // Allow HTTPS from anywhere (use more restrictive CIDR in production)
              Description: "HTTPS access",
            },
          ],
        },
      ],
    };

    const addIngressCommand = new AuthorizeSecurityGroupIngressCommand(params);
    await ec2Client.send(addIngressCommand);
    // const result = await ec2Client.send(addIngressCommand);

    console.log("   Security group rules added for SSH and HTTPS\n");
    // console.log("*** Security group rules for SSH and HTTPS addes:", result);
  } catch (error) {
    console.log("Error adding security ingress rules:", error);
  }
};
