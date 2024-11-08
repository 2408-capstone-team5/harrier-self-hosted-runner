import { createSecurityGroup } from "../utils/aws/ec2/createSecurityGroup";
import { addSecurityGroupRules } from "../utils/aws/ec2/addSecurityGroupRules";
import { createEC2 } from "../utils/aws/ec2/createEC2";
import { waitEC2StatusOk } from "../utils/aws/ec2/waitEC2StatusOk";
import { describeEC2s } from "../utils/aws/ec2/describeEC2Instances";
import { stopInstance } from "../utils/aws/ec2/stopEC2";

const wait = (ms: number) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
};

export const setupEC2Runner = async () => {
  await createSecurityGroup();
  await addSecurityGroupRules();

  const instanceId = await createEC2();

  wait(500);

  await describeEC2s(instanceId);
  await waitEC2StatusOk(instanceId);
  await stopInstance(instanceId);
};
