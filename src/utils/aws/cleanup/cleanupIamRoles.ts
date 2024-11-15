import {
  IAMClient,
  ListAttachedRolePoliciesCommand,
  DetachRolePolicyCommand,
  ListRolePoliciesCommand,
  DeleteRolePolicyCommand,
  ListRolesCommand,
  DeleteRoleCommand,
} from "@aws-sdk/client-iam";

const iamClient = new IAMClient({ region: "us-east-1" });

// Function to detach managed policies from a role
async function detachManagedPolicies(roleName: string) {
  try {
    const listAttachedRolePoliciesCommand = new ListAttachedRolePoliciesCommand(
      { RoleName: roleName }
    );
    const attachedPoliciesResponse = await iamClient.send(
      listAttachedRolePoliciesCommand
    );

    const attachedPolicies = attachedPoliciesResponse.AttachedPolicies || [];

    for (const policy of attachedPolicies) {
      console.log(
        `   Detaching managed policy: ${policy.PolicyArn} from role: ${roleName}`
      );
      const detachRolePolicyCommand = new DetachRolePolicyCommand({
        RoleName: roleName,
        PolicyArn: policy.PolicyArn,
      });
      await iamClient.send(detachRolePolicyCommand);
      console.log(`   Successfully detached policy: ${policy.PolicyArn}`);
    }
  } catch (error) {
    console.error(
      `❌ Error detaching managed policies for role ${roleName}:`,
      error
    );
  }
}

// Function to delete inline policies attached to the role
async function deleteInlinePolicies(roleName: string) {
  try {
    const listRolePoliciesCommand = new ListRolePoliciesCommand({
      RoleName: roleName,
    });
    const inlinePoliciesResponse = await iamClient.send(
      listRolePoliciesCommand
    );

    const inlinePolicies = inlinePoliciesResponse.PolicyNames || [];

    for (const policyName of inlinePolicies) {
      console.log(
        `   Deleting inline policy: ${policyName} from role: ${roleName}`
      );
      const deleteRolePolicyCommand = new DeleteRolePolicyCommand({
        RoleName: roleName,
        PolicyName: policyName,
      });
      await iamClient.send(deleteRolePolicyCommand);
      console.log(`   Successfully deleted inline policy: ${policyName}`);
    }
  } catch (error) {
    console.error(
      `❌ Error deleting inline policies for role ${roleName}:`,
      error
    );
  }
}

// Function to delete IAM roles with names starting with "harrier"
export const cleanupIamRoles = async () => {
  try {
    console.log("** Start IAM role cleanup");

    const listRolesCommand = new ListRolesCommand({});
    const rolesResponse = await iamClient.send(listRolesCommand);

    const roles = rolesResponse.Roles || [];

    for (const role of roles) {
      // Filter by role name starting with "Harrier"
      if (role.RoleName?.startsWith("harrier")) {
        try {
          // Step 1: Detach managed policies
          await detachManagedPolicies(role.RoleName);

          // Step 2: Delete inline policies
          await deleteInlinePolicies(role.RoleName);

          // Step 3: Delete role
          console.log(`   Deleting IAM Role: ${role.RoleName}`);
          const deleteRoleCommand = new DeleteRoleCommand({
            RoleName: role.RoleName,
          });
          await iamClient.send(deleteRoleCommand);
          console.log(`   IAM Role deleted: ${role.RoleName}`);
        } catch (error) {
          console.error(`❌ Error deleting IAM Role ${role.RoleName}:`, error);
        }
      }
    }
    console.log("✅ Successfully completed IAM role cleanup.\n");
  } catch (error) {
    console.error("❌ Error listing IAM roles:", error, "\n");
  }
};
