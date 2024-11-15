import {
  EC2Client,
  DescribeInstancesCommand,
  TerminateInstancesCommand,
  DeleteSecurityGroupCommand,
} from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({ region: "us-east-1" }); // specify your region

// Find EC2 instances by prefix
const getInstancesByNamePrefix = async (prefix: string) => {
  const command = new DescribeInstancesCommand({
    Filters: [
      {
        Name: "tag:Name",
        Values: [`${prefix}*`],
      },
      {
        Name: "instance-state-name",
        Values: ["pending", "running", "stopping", "stopped"], // Excludes "terminated" state
      },
    ],
  });

  const response = await ec2Client.send(command);
  console.log("   EC2 instance query response filtered by prefix received.");

  // Extract instance IDs and security groups from the response
  const instanceIds: string[] = [];
  const securityGroups: string[] = [];

  if (response?.Reservations) {
    response.Reservations.forEach((reservation) => {
      if (reservation.Instances) {
        reservation.Instances.forEach((instance) => {
          if (instance.InstanceId) {
            console.log("      Found EC2 instance: ", instance.InstanceId);
            instanceIds.push(instance.InstanceId);
          }
          if (instance.SecurityGroups) {
            instance.SecurityGroups.forEach((group) => {
              if (group.GroupId) {
                console.log("      Found security group: ", group.GroupId);
                securityGroups.push(group.GroupId);
              }
            });
          }
        });
      }
    });
  }

  console.log("   EC2 instance query response parsing completed.");
  const harrierInstances = { instanceIds, securityGroups };
  return harrierInstances;
};

const terminateInstances = async (instanceIds: string[]) => {
  const command = new TerminateInstancesCommand({
    InstanceIds: instanceIds,
  });

  const response = await ec2Client.send(command);
  console.log("   Terminating instances:", response.TerminatingInstances);
};

// Function to check the status of the instance
const waitForInstanceTermination = async (instanceIds: string[]) => {
  let terminated = false;
  console.log("   ... Waiting for instances to terminate ...");

  while (!terminated) {
    // Describe the instance to get its current state
    const describeCommand = new DescribeInstancesCommand({
      InstanceIds: instanceIds,
    });

    const response = await ec2Client.send(describeCommand);

    // Check if the instance is terminated
    let instanceState = "";

    if (
      response?.Reservations &&
      response.Reservations[0].Instances &&
      response.Reservations[0].Instances[0].State?.Name
    ) {
      instanceState = response.Reservations[0].Instances[0].State.Name;
    }

    if (instanceState === "terminated") {
      console.log(
        `   One or more of the instances ${instanceIds} has been terminated.`
      );
      terminated = true;
    } else {
      // Wait for 0.5 seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 0.5-second wait
    }
  }
};

// Helper function to get instances associated with a security group
const getInstancesUsingSecurityGroup = async (groupId: string) => {
  const command = new DescribeInstancesCommand({
    Filters: [
      {
        Name: "instance.group-id",
        Values: [groupId],
      },
    ],
  });

  const response = await ec2Client.send(command);
  const instanceIds: string[] = [];

  if (response.Reservations) {
    response.Reservations.forEach((reservation) => {
      if (reservation.Instances) {
        reservation.Instances.forEach((instance) => {
          if (instance.InstanceId) {
            instanceIds.push(instance.InstanceId);
          }
        });
      }
    });
  }

  return instanceIds;
};

const deleteSecurityGroups = async (securityGroups: string[]) => {
  // if (!securityGroups) {
  //   console.log("No security groups to delete.");
  //   return;
  // }

  // Delete each security group one at a time
  for (const groupId of securityGroups) {
    const associatedInstances = await getInstancesUsingSecurityGroup(groupId);

    if (associatedInstances.length === 0) {
      console.log(`   Deleting security group: ${groupId}`);
      const deleteSgCommand = new DeleteSecurityGroupCommand({
        GroupId: groupId,
      });
      await ec2Client.send(deleteSgCommand);

      console.log(`   Security group ${groupId} deleted.`);
    } else {
      console.log(
        `❌ Error: Security group ${groupId} is still in use by other instances.`
      );
    }
  }
};

export const cleanupEC2s = async () => {
  try {
    console.log("** Start EC2 cleanup");

    // Step 1: Find all Harrier EC2 instances and security groups
    const harrierInstances = await getInstancesByNamePrefix("harrier");

    if (harrierInstances.instanceIds.length === 0) {
      console.log("   No instances to terminate.");
    } else {
      // Step 2: Terminate all Harrier EC2 instances
      await terminateInstances(harrierInstances.instanceIds);

      // Step 2a: Wait for instance termination
      await waitForInstanceTermination(harrierInstances.instanceIds);
    }

    if (harrierInstances.securityGroups.length === 0) {
      console.log("   No security groups to delete.");
    } else {
      // Step 3: Delete all Security groups associated with Harrier EC2 instances
      await deleteSecurityGroups(harrierInstances.securityGroups);
    }

    console.log("✅ Successfully completed EC2 cleanup.\n");
  } catch (error) {
    console.error("❌ Error cleaning up EC2: ", error, "\n");
  }
};
