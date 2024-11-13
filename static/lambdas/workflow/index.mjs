// import { fromIni } from "@aws-sdk/credential-provider-ini"; // For loading credentials from ~/.aws/credentials
import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";
import {
  EC2Client,
  DescribeInstancesCommand,
  StartInstancesCommand,
  waitUntilInstanceRunning,
  StopInstancesCommand,
} from "@aws-sdk/client-ec2";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import {
  S3Client,
  ListBucketsCommand,
  GetBucketTaggingCommand,
} from "@aws-sdk/client-s3";

const HARRIER_TAG_KEY = "Agent";
const HARRIER_TAG_VALUE = "Harrier-Runner";
const REGION = process.env.AWS_REGION;
// const REGION = "us-east-1"; // Change to your desired region

// User needs to use the exact below secret name
const secretName = "github/pat/harrier";

// Initialize the Secrets Manager client
const secretClient = new SecretsManagerClient({
  region: REGION,
});

// Initialize the SSM client
const ssmClient = new SSMClient({
  region: REGION,
  // credentials: fromIni({ profile: "default" }), // Load credentials from the default profile
});

// Initialize the EC2 client
const ec2Client = new EC2Client({
  region: REGION,
  // credentials: fromIni({ profile: "default" }), // Load credentials from the default profile
});

// Initialize the S3 client
const s3Client = new S3Client({
  region: REGION,
  // credentials: fromIni({ profile: "default" }), // Load credentials from the default profile
});

async function findS3Bucket() {
  try {
    const bucketList = await s3Client.send(new ListBucketsCommand({}));
    // console.log('*** BUCKETLIST ***');
    // console.log(bucketList);
    // console.log('****************');
    for (const bucket of bucketList.Buckets) {
      const bucketName = bucket.Name;
      // console.log(`BucketName: ${bucketName}`);

      try {
        const taggingData = await s3Client.send(
          new GetBucketTaggingCommand({ Bucket: bucketName })
        );
        // console.log(`taggingData: ${taggingData}`);

        const tags = taggingData.TagSet;
        // console.log(`tags: ${tags}`);
        const tag = tags.find(
          (tag) =>
            tag.Key === HARRIER_TAG_KEY && tag.Value === HARRIER_TAG_VALUE
        );

        if (tag) {
          console.log(
            `✅ Bucket with tag "${tag.Key}:${tag.Value}" found: ${bucketName}`
          );
          return bucketName; // Return the matching bucket name
        }
      } catch (error) {
        console.log(`No tags found on bucket: ${bucketName}`);
      }
    }
    console.log(
      `❌ No bucket found with tag "${HARRIER_TAG_KEY}:${HARRIER_TAG_VALUE}"`
    );
  } catch (error) {
    console.error(
      `❌ Error fetching bucket with tag ${HARRIER_TAG_KEY}:${HARRIER_TAG_VALUE}`,
      error
    );
  }
}

async function findInstance(state) {
  try {
    const params = {
      Filters: [
        { Name: "instance-state-name", Values: [state] },
        {
          Name: `tag:${HARRIER_TAG_KEY}`,
          Values: [HARRIER_TAG_VALUE],
        },
      ],
    };

    const command = new DescribeInstancesCommand(params);
    const data = await ec2Client.send(command);

    let instanceId;
    if (data.Reservations?.length) {
      instanceId = data.Reservations[0].Instances[0].InstanceId;
      console.log("✅ Found instance:", instanceId);
      return instanceId;
    } else {
      return undefined;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error finding instance:", error.message);
    } else {
      console.error("❌ Unexpected error:", error);
    }
    return undefined;
  }
}

async function startInstance(instanceId) {
  try {
    console.log(`Trying to start instanceId: ${instanceId}`);
    const params = {
      InstanceIds: [instanceId],
    };
    const command = new StartInstancesCommand(params);
    const response = await ec2Client.send(command);
    console.log("✅ Instance start command sent:", response.StartingInstances);
  } catch (error) {
    console.error("❌ Error starting instances:", error);
  }
}

async function stopInstance(instanceId) {
  try {
    const command = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const response = await ec2Client.send(command);
    console.log("✅ Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
}

const MAX_WAITER_TIME_IN_SECONDS = 60 * 8;

async function waitForInstanceRunning(instanceId) {
  try {
    console.log(`Polling InstanceId ${instanceId} until RUNNING.`);
    const startTime = new Date();
    await waitUntilInstanceRunning(
      {
        client: ec2Client,
        maxWaitTime: MAX_WAITER_TIME_IN_SECONDS,
      },
      { InstanceIds: [instanceId] }
    );
    const endTime = new Date();
    console.log(
      "✅ RUNNING Succeeded after time: ",
      (endTime.getTime() - startTime.getTime()) / 1000
    );
  } catch (error) {
    console.error("❌ Error waiting for instance to run:", error);
  }
}

const wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
};

async function sendCommandToSSM(params) {
  // Send the command to the EC2 instance
  const command = new SendCommandCommand(params);
  const response = await ssmClient.send(command);

  if (!response?.Command?.CommandId) {
    console.error("❌ Error: Command ID not received");
  } else {
    console.log(
      "✅ Command sent successfully. Command ID:",
      response.Command.CommandId
    );
  }
}

let count = 0;
async function runCommand(params) {
  try {
    // Send the command to the EC2 instance
    await sendCommandToSSM(params);

    // Optionally, you can check the result after the command has completed.
    // You would typically poll the command status here.
  } catch (error) {
    console.error(
      `⚠️ Failed sending command ${count}, trying again until 40...`
    );
    if (count < 40) {
      wait(500);
      count += 1;
      await runCommand(params);
    }
  }
}

const getScript = (secret, owner, s3BucketName) => {
  const script = `#!/bin/bash

  cd /home/ec2-user/actions-runner

  unique_value=$(date +%s)
  name="Harrier Runner-$unique_value"

  response=$(curl -L \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${secret}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
    -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted"],"work_folder":"_work"}')

  # echo $response

  runner_id=$(echo "$response" | jq '.runner.id')
  runner_name=$(echo "$response" | jq -r '.runner.name')
  encoded_jit_config=$(echo "$response" | jq -r '.encoded_jit_config')

  echo "Runner ID: $runner_id"
  echo "Runner Name: $runner_name"
  #echo "Encoded JIT Config: $encoded_jit_config"

  cd ..
  sudo chown ec2-user:ec2-user ./actions-runner
  cd actions-runner
  sudo chown ec2-user:ec2-user ./s3bucket

  su - ec2-user -c "mount-s3 ${s3BucketName} /home/ec2-user/actions-runner/s3bucket --allow-overwrite"
  su - ec2-user -c "/home/ec2-user/actions-runner/run.sh --jitconfig $encoded_jit_config"

  echo "Done..."`;

  return script;
};

const main = async (action, secret, owner) => {
  if (action === "queued") {
    console.log("🔍 Calling findS3Bucket from our Lambda");
    const s3BucketName = await findS3Bucket();
    if (!s3BucketName) {
      throw new Error("❌ S3 bucket not found!");
    }
    console.log(`✅ Found S3 Bucket ${s3BucketName}`);

    console.log("🔍 Calling findInstance from our Lambda");
    const instanceId = await findInstance("stopped"); // This could return undefined currently, if no stopped instances are found

    console.log(instanceId);
    if (instanceId) {
      console.log("Calling startInstance from workflow lambda");
      await startInstance(instanceId);

      // Wait for instance to be running?????????
      await waitForInstanceRunning(instanceId);

      // Parameters for the SendCommand API
      const params = {
        DocumentName: "AWS-RunShellScript", // This document allows running shell scripts
        InstanceIds: [instanceId], // Replace with your EC2 instance ID
        Parameters: {
          commands: [getScript(secret, owner, s3BucketName)], // Specify the shell script to run
        },
      };
      await runCommand(params);
      console.log("✅ Shell Script successfully run");
    } else {
      console.log("❌ Error: instanceId missing!");
    }
  } else if (action === "completed") {
    console.log("🔍 Calling findInstance from our Lambda");
    // Does the webhook payload include the name of the runner that has completed the work?
    // Maybe we can send the instanceId as part of the JIT request so that it can be
    //   returned with the completed webhook...
    const instanceId = await findInstance("running"); // This could return undefined currently, if no running instances are found
    if (instanceId) {
      console.log("✅ Calling stopInstance from workflow lambda");
      await stopInstance(instanceId);
    } else {
      console.log("❌ Error: instanceId missing!");
    }
  }
};

export const handler = async (event) => {
  console.log("*********** NEW 7 !!! ******");
  console.log(`REGION = ${REGION}`);
  console.log({ theEvent: event });
  console.log({ theZen: event.zen });
  console.log({ theAction: event.action });

  if (event.zen) {
    console.log(`💯 Ping received in event.zen: ${event.zen}`);
    console.log("💯 returning early from the lambda handler function...");
    const response = {
      statusCode: 200,
      body: JSON.stringify("Ping of workflow lambda success!"),
    };
    return response;
  }

  try {
    const action = event.action.trim();
    console.log("🚀 GitHub Workflow Action:", action);

    const owner = event.repository.owner.login.trim();
    console.log("🚀 GitHub Workflow Owner:", owner);

    console.log("💯 about to access client secret...");
    const secretResponse = await secretClient.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    );
    console.log("💯 Got client secret...");

    const secret = secretResponse.SecretString;
    // const secret = "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";
    console.log({ secret });
    console.log("💯 before main...");
    await main(action, secret, owner);
    console.log("💯 after main...");

    const response = {
      statusCode: 200,
      body: JSON.stringify("Called workflow lambda"),
    };
    console.log("💯 success?!");
    return response;
  } catch (error) {
    console.error(`❌ Error in handler function`, error);

    throw error;
  }
};

// handler(EVENT);

// await main("queued");

// wait(1000 * 60);
// await main("completed");
