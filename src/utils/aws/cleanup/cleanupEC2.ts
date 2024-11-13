import {
  EC2Client,
  TerminateInstancesCommand,
  DescribeInstancesCommand,
  DeleteSecurityGroupCommand,
} from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({ region: "us-east-1" }); // specify your region

async function terminateInstanceAndDeleteSecurityGroup(instanceId) {
  try {
    // Step 1: Describe the EC2 instance to find the associated security group
    const describeParams = {
      InstanceIds: [instanceId],
    };
    const describeData = await ec2Client.send(
      new DescribeInstancesCommand(describeParams)
    );

    if (describeData.Reservations?.Instances) {
      const instance = describeData.Reservations[0].Instances[0];
      const securityGroupId = instance.SecurityGroups[0].GroupId; // assuming the instance has at least one security group

      console.log(`Found security group: ${securityGroupId}`);

      // Step 2: Terminate the EC2 instance
      const terminateParams = {
        InstanceIds: [instanceId],
      };
      await ec2Client.send(new TerminateInstancesCommand(terminateParams));
      console.log(`Terminated EC2 instance: ${instanceId}`);

      // Step 3: Delete the security group (make sure it's not in use by other resources)
      const deleteParams = {
        GroupId: securityGroupId,
      };
      await ec2Client.send(new DeleteSecurityGroupCommand(deleteParams));
      console.log(`Deleted security group: ${securityGroupId}`);
    } else {
      console.log("Instance not found or does not have a security group.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
terminateInstanceAndDeleteSecurityGroup("i-1234567890abcdef0");
