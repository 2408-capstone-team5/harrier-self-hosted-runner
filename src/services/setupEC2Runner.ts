import { createSecurityGroup } from "../utils/aws/ec2/createSecurityGroup";
import { addSecurityGroupRules } from "../utils/aws/ec2/addSecurityGroupRules";
import { createEC2 } from "../utils/aws/ec2/createEC2";
import { waitEC2StatusOk } from "../utils/aws/ec2/waitEC2StatusOk";
// import { describeEC2s } from "../utils/aws/ec2/describeEC2s";
import { stopEC2s } from "../utils/aws/ec2/stopEC2s";
import { configHarrier } from "../config/configHarrier";

export const setupEC2Runner = async () => {
  try {
    console.log("** Starting setupEC2Runner...");
    await createSecurityGroup();
    await addSecurityGroupRules();

    // For creating just one EC2 runner:
    // const instanceId = await createEC2();

    // For creating a pool of EC2 runners:
    const instanceIds = [];

    for (let i = 0; i < configHarrier.warmPoolSize; i += 1) {
      const instanceId = await createEC2(i);
      instanceIds.push(instanceId);
    }

    // await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5-second wait if describeEC2s is necessary for debugging
    // await describeEC2s(instanceId);

    // change argument from instanceId to instanceIds when creating a pool of EC2s
    await waitEC2StatusOk(instanceIds);
    await stopEC2s(instanceIds);

    console.log("✅ Successfully set up EC2.\n");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
    } else {
      throw new Error(`Error setting up EC2!`);
    }
  }
};
