"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupEC2s = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" }); // specify your region
// Find EC2 instances by prefix
const getInstancesByNamePrefix = (prefix) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.DescribeInstancesCommand({
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
    const response = yield ec2Client.send(command);
    console.log("   EC2 instance query response filtered by prefix received.");
    // Extract instance IDs and security groups from the response
    const instanceIds = [];
    const securityGroups = [];
    if (response === null || response === void 0 ? void 0 : response.Reservations) {
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
});
const terminateInstances = (instanceIds) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.TerminateInstancesCommand({
        InstanceIds: instanceIds,
    });
    const response = yield ec2Client.send(command);
    console.log("   Terminating instances:", response.TerminatingInstances);
});
// Function to check the status of the instance
const waitForInstanceTermination = (instanceIds) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let terminated = false;
    console.log("   ... Waiting for instances to terminate ...");
    while (!terminated) {
        // Describe the instance to get its current state
        const describeCommand = new client_ec2_1.DescribeInstancesCommand({
            InstanceIds: instanceIds,
        });
        const response = yield ec2Client.send(describeCommand);
        // Check if the instance is terminated
        let instanceState = "";
        if ((response === null || response === void 0 ? void 0 : response.Reservations) &&
            response.Reservations[0].Instances &&
            ((_a = response.Reservations[0].Instances[0].State) === null || _a === void 0 ? void 0 : _a.Name)) {
            instanceState = response.Reservations[0].Instances[0].State.Name;
        }
        if (instanceState === "terminated") {
            console.log(`   One or more of the instances ${instanceIds} has been terminated.`);
            terminated = true;
        }
        else {
            // Wait for 0.5 seconds before polling again
            yield new Promise((resolve) => setTimeout(resolve, 1000)); // 0.5-second wait
        }
    }
});
// Helper function to get instances associated with a security group
const getInstancesUsingSecurityGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_ec2_1.DescribeInstancesCommand({
        Filters: [
            {
                Name: "instance.group-id",
                Values: [groupId],
            },
        ],
    });
    const response = yield ec2Client.send(command);
    const instanceIds = [];
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
});
const deleteSecurityGroups = (securityGroups) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!securityGroups) {
    //   console.log("No security groups to delete.");
    //   return;
    // }
    // Delete each security group one at a time
    for (const groupId of securityGroups) {
        const associatedInstances = yield getInstancesUsingSecurityGroup(groupId);
        if (associatedInstances.length === 0) {
            console.log(`   Deleting security group: ${groupId}`);
            const deleteSgCommand = new client_ec2_1.DeleteSecurityGroupCommand({
                GroupId: groupId,
            });
            yield ec2Client.send(deleteSgCommand);
            console.log(`   Security group ${groupId} deleted.`);
        }
        else {
            console.log(`❌ Error: Security group ${groupId} is still in use by other instances.`);
        }
    }
});
const cleanupEC2s = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Start EC2 cleanup");
        // Step 1: Find all Harrier EC2 instances and security groups
        const harrierInstances = yield getInstancesByNamePrefix("harrier");
        if (harrierInstances.instanceIds.length === 0) {
            console.log("   No instances to terminate.");
        }
        else {
            // Step 2: Terminate all Harrier EC2 instances
            yield terminateInstances(harrierInstances.instanceIds);
            // Step 2a: Wait for instance termination
            yield waitForInstanceTermination(harrierInstances.instanceIds);
        }
        if (harrierInstances.securityGroups.length === 0) {
            console.log("   No security groups to delete.");
        }
        else {
            // Step 3: Delete all Security groups associated with Harrier EC2 instances
            yield deleteSecurityGroups(harrierInstances.securityGroups);
        }
        console.log("✅ Successfully completed EC2 cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error cleaning up EC2: ", error, "\n");
    }
});
exports.cleanupEC2s = cleanupEC2s;
