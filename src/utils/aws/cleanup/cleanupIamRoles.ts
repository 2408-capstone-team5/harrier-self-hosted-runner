import {
  IAMClient,
  ListRolesCommand,
  DeleteRoleCommand,
} from "@aws-sdk/client-iam";

const iamClient = new IAMClient({ region: "us-east-1" });

// Function to delete IAM roles with names starting with "Harrier"
export const cleanupIamRoles = async () => {
  try {
    console.log("Start IAM role cleanup");

    const listRolesCommand = new ListRolesCommand({});
    const rolesResponse = await iamClient.send(listRolesCommand);

    const roles = rolesResponse.Roles || [];

    for (const role of roles) {
      // Filter by role name starting with "Harrier"
      if (role.RoleName?.startsWith("harrier")) {
        try {
          console.log(`Deleting IAM Role: ${role.RoleName}`);
          const deleteRoleCommand = new DeleteRoleCommand({
            RoleName: role.RoleName,
          });
          await iamClient.send(deleteRoleCommand);
          console.log(`IAM Role deleted: ${role.RoleName}`);
        } catch (error) {
          console.error(`Error deleting IAM Role ${role.RoleName}:`, error);
        }
      }
    }
    console.log("*** IAM role cleanup complete ***");
  } catch (error) {
    console.error("Error listing IAM roles:", error);
  }
};
