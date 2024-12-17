import {
  IAMClient,
  GetInstanceProfileCommand,
  CreateInstanceProfileCommand,
  AddRoleToInstanceProfileCommand,
} from "@aws-sdk/client-iam";

import { configHarrier } from "../../../config/configHarrier";

const iamClient = new IAMClient({ region: configHarrier.region });

export async function createInstanceProfile(
  roleName: string,
  instanceProfileName: string
): Promise<string> {
  try {
    // First, check if EC2 runner instance profile already exists
    console.log(
      `Checking if instance profile (${instanceProfileName}) exists...`
    );
    await iamClient.send(
      new GetInstanceProfileCommand({
        InstanceProfileName: instanceProfileName,
      })
    );
    console.log(`Instance profile (${instanceProfileName}) already exists.`);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "NoSuchEntityException") {
      // Create the instance profile, if it doesn't exist
      console.log(
        `Instance profile (${instanceProfileName}) does not exist. Creating it...`
      );

      await iamClient.send(
        new CreateInstanceProfileCommand({
          InstanceProfileName: instanceProfileName,
        })
      );
      console.log(
        `🚦 ***waiting for instance profile ${instanceProfileName} to PROPAGATE***`
      );
      await new Promise((res) => setTimeout(res, 10_000));
      console.log(
        `✅ Successfully created instance profile ${instanceProfileName} \n`
      );
    } else {
      console.error(
        `Error checking instance profile (${instanceProfileName}):`,
        error
      );
      throw new Error(`Failed to check or create instance profile: ${error}`);
    }
  }
  try {
    // Add the IAM role to the instance profile
    await iamClient.send(
      new AddRoleToInstanceProfileCommand({
        InstanceProfileName: instanceProfileName,
        RoleName: roleName,
      })
    );
    console.log(
      `✅ Successfully added role ${roleName} to instance profile ${instanceProfileName} \n`
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "LimitExceededException") {
      console.log(
        `Role (${roleName}) is already associated with the instance profile (${instanceProfileName}).`
      );
    } else {
      throw new Error(
        `❌ Error adding role ${roleName} to instance profile ${instanceProfileName}: ${error}`
      );
    }
  }

  return instanceProfileName;
}
