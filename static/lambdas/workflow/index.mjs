// SEED the s3 instance-status tracking data DURING SETUP ACTION!
// MODIFY this lambda's permissions/assumed role's policy statements to allow for lambda-invocation

import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";
import {
  EC2Client,
  DescribeInstancesCommand,
  StartInstancesCommand,
  waitUntilInstanceRunning,
} from "@aws-sdk/client-ec2";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

import {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
  PutObjectCommand,
  GetBucketTaggingCommand,
} from "@aws-sdk/client-s3";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// ideally we could put all of these in the `configHarrier` file
const HARRIER_TAG_KEY = "Agent";
const HARRIER_TAG_VALUE = "Harrier-Runner";
const REGION = process.env.AWS_REGION;

const SSM_SEND_COMMAND_TIMEOUT = 100;
const MAX_WAITER_TIME_IN_SECONDS = 60 * 4;
const SECRET_NAME = "github/pat/harrier";

const [secretClient, ssmClient, ec2Client, s3Client, lambdaClient] = [
  SecretsManagerClient,
  SSMClient,
  EC2Client,
  S3Client,
  LambdaClient,
].map((client) => new client({ region: REGION }));


function makeScriptForIdleEC2(secret, owner, instanceId) {
  return `#!/bin/bash
    echo "Start - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    # X variable below is for possible future multiple runners on a single instance
    X=1
    
    echo $USER
    echo "Is user in docker group??"
    getent group docker

    cd /home/ubuntu

    echo "change dir perms.. - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    sudo chown ubuntu:ubuntu ./actions-runner
    cd actions-runner
    sudo chown ubuntu:ubuntu ./s3bucket

    # removed s3 bucket mount 
    # removed s3 bucket mount
    # removed s3 bucket mount 

    for i in $(seq 1 $X); do
      echo "Iteration $i - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      unique_value=$(date +%s)
      name="Harrier Runner-$unique_value-$i"

      echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      response=$(curl -L \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted", "${instanceId}"],"work_folder":"_work"}')

      echo "After CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      runner_id=$(echo "$response" | jq '.runner.id')
      runner_name=$(echo "$response" | jq -r '.runner.name')
      encoded_jit_config=$(echo "$response" | jq -r '.encoded_jit_config')

      echo "Runner ID: $runner_id"
      echo "Runner Name: $runner_name"

      # Launch run.sh in the background for each iteration
      su - ubuntu -c "newgrp docker && nohup /home/ubuntu/actions-runner/run.sh --jitconfig $encoded_jit_config > /home/ubuntu/actions-runner/run-$i.log 2>&1 &"

      echo "After su run.sh for iteration $i - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
      echo "Sleep 2 seconds to avoid hitting Github too fast with new runner requests"
      sleep 2
    done

    echo "Done with all iterations - $(date '+%Y-%m-%d %H:%M:%S-%3N')"`;
}

function makeScriptForOfflineEC2(secret, owner, instanceId, s3BucketName) {
  return `#!/bin/bash
    echo "Start - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    # X variable below is for possible future multiple runners on a single instance
    X=1
    
    echo $USER
    echo "Is user in docker group??"
    getent group docker

    cd /home/ubuntu

    echo "change dir perms.. - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    sudo chown ubuntu:ubuntu ./actions-runner
    cd actions-runner
    sudo chown ubuntu:ubuntu ./s3bucket

    echo "Before S3 Bucket Mount - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    su - ubuntu -c "mount-s3 ${s3BucketName} /home/ubuntu/actions-runner/s3bucket --allow-overwrite"
    echo "After S3 Bucket Mount - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    
    for i in $(seq 1 $X); do
      echo "Iteration $i - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      unique_value=$(date +%s)
      name="Harrier Runner-$unique_value-$i"

      echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      response=$(curl -L \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted", "${instanceId}"],"work_folder":"_work"}')

      echo "After CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      runner_id=$(echo "$response" | jq '.runner.id')
      runner_name=$(echo "$response" | jq -r '.runner.name')
      encoded_jit_config=$(echo "$response" | jq -r '.encoded_jit_config')

      echo "Runner ID: $runner_id"
      echo "Runner Name: $runner_name"

      # Launch run.sh in the background for each iteration
      su - ubuntu -c "newgrp docker && nohup /home/ubuntu/actions-runner/run.sh --jitconfig $encoded_jit_config > /home/ubuntu/actions-runner/run-$i.log 2>&1 &"

      echo "After su run.sh for iteration $i - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
      echo "Sleep 2 seconds to avoid hitting Github too fast with new runner requests"
      sleep 2
    done

    echo "Done with all iterations - $(date '+%Y-%m-%d %H:%M:%S-%3N')"`;
}

async function getSecret() {
  try {
    const secretResponse = await secretClient.send(
      new GetSecretValueCommand({
        SecretId: SECRET_NAME,
      })
    );
    if (!secretResponse.SecretString) {
      throw new Error("❌ malformed secretResponse data");
    }
    return secretResponse.SecretString;
  } catch (error) {
    console.error(`❌ error fetching secret: ${SECRET_NAME}`, error);
  }
}

async function findS3Bucket() {
  const bucketList = await s3Client.send(new ListBucketsCommand({}));

  for (const bucket of bucketList.Buckets) {
    try {
      const taggingData = await s3Client.send(
        new GetBucketTaggingCommand({ Bucket: bucket.Name })
      );

      const bucketHasHarrierTag = taggingData.TagSet.some(
        (tag) => tag.Key === HARRIER_TAG_KEY && tag.Value === HARRIER_TAG_VALUE
      );

      if (bucketHasHarrierTag) {
        console.log(`✅ Bucket found: ${bucket.Name}`);
        return bucket.Name;
      }
    } catch (error) {
      if (error.name === "NoSuchTagSet") {
        console.warn(`⚠️ Bucket ${bucket.Name} does not have tagging.`);
      } else {
        console.error(
          `❌ Error fetching or checking tags of bucket ${bucket.Name}: `,
          error
        );
      }
    }
  }

  throw new Error(
    "❌ An S3 bucket with HARRIER_TAG_KEY: HARRIER_TAG_VALUE was not found!"
  );
}

async function runCommand(params, retries = SSM_SEND_COMMAND_TIMEOUT) {
  for (let count = 0; count < retries; count++) {
    try {
      await ssmClient.send(new SendCommandCommand(params));
      return;
    } catch (error) {
      if (error.name === "InvalidInstanceId") {
        console.error(`⚠️ Retry ${count + 1}/${retries}`);
        await new Promise((res) => setTimeout(res, 500));
      } else {
        console.error("❌ Error running command:", error);
        throw error;
      }
    }
  }
  throw new Error(`❌ SSM Send Command timed out after ${retries} tries!`);
}

async function startStoppedInstance(instanceId) { // stopped or 'offline'
  try {
    console.log(`🚀 Starting a stopped instance: ${instanceId}`);
    const start = new StartInstancesCommand({ InstanceIds: [instanceId] });
    await ec2Client.send(start);
  } catch (error) {
    console.error(`❌ Error starting a stopped instance: ${instanceId}`, error);
  }
}

async function getAllHarrierRunners() {
  try {
    const describe = new DescribeInstancesCommand({
      Filters: [
        { Name: `tag:${HARRIER_TAG_KEY}`, Values: [HARRIER_TAG_VALUE] },
      ],
    });
    const response = await ec2Client.send(describe);

    const instanceIds = response.Reservations.flatMap((res) =>
      res.Instances.map((instance) => instance.InstanceId)
    );

    if (!instanceIds.length) {
      throw new Error(`❌ 0 Harrier-tagged instances located`);
    }

    console.log(`${instanceIds.length} Harrier-tagged instances located`);
    return instanceIds;
  } catch (error) {
    console.error(`❌ Error fetching Harrier-tagged instance ids: `, error);
    throw new Error(`❌ the getAllHarrierRunners function failed`);
  }
}

async function checkInstanceStatus(
  s3BucketName,
  instanceId,
  searchedForStatus
) {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: `runner-statuses/${instanceId}.json`,
      })
    );

    const bodyString = await streamToString(response.Body);
    const instanceState = JSON.parse(bodyString);

    return instanceState.status === searchedForStatus; // if the strings match, return true
  } catch (error) {
    console.error(`❌ error in checkInstanceStatus`, error);
  }
}

async function findSuitableRunner(instanceIds, s3BucketName) {
  try {
    for (const id of instanceIds) {
      const isIdle = await checkInstanceStatus(s3BucketName, id, "idle");
      if (isIdle) {
        return { instanceId: id, currentStatus: "idle" };
      }
    }

    for (const id of instanceIds) {
      const isOffline = await checkInstanceStatus(s3BucketName, id, "offline");
      if (isOffline) {
        return { instanceId: id, currentStatus: "offline" };
      }
    }

    return { instanceId: null, currentStatus: "busy" };
  } catch (error) {
    console.error(`❌ an error occurred when seeking a suitable runner`, error);
    throw new Error(`❌ findSuitableRunner failed`);
  }
}

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function updateInstanceStatus(
  s3BucketName,
  instanceId,
  currentStatus,
  nextStatus
) {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: `instance-states/${instanceId}.json`,
      })
    );

    const bodyString = await streamToString(response.Body);
    const instanceState = JSON.parse(bodyString);

    console.log(
      `actualStatus: ${instanceState.status}, currentStatus: ${currentStatus}, nextStatus:  ${nextStatus}`
    );

    if (instanceState.status !== currentStatus) {
      throw new Error(
        `❌ Current status does not match for instance ${instanceId}`
      );
    }

    instanceState.status = nextStatus;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: `instance-states/${instanceId}.json`,
        Body: JSON.stringify(instanceState),
        ContentType: "application/json",
      })
    );

    console.log(
      `✅ Status updated to ${nextStatus} for instance ${instanceId}`
    );
  } catch (error) {
    console.error(error);
  }
}

async function invokeTimeoutLambda(instanceId, delayInMinutes, s3BucketName) {
  try {
    const invoke = new InvokeCommand({
      FunctionName: "timeout",
      Payload: JSON.stringify({
        instanceId,
        delayInMinutes,
        s3BucketName
      }),
    });

    const response = await lambdaClient.send(invoke);

    console.log(
      "✅ Lambda function invoked successfully with Payload: ",
      JSON.parse(new TextDecoder("utf-8").decode(response.Payload))
    );
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
    throw error;
  }
}

export const handler = async (event) => {
  if ('zen' in event) {
    return {
      statusCode: 200,
      body: JSON.stringify(`✅ Successful ping: ${event.zen}`),
    };
  }

  try {
    const secret = await getSecret();
    const s3BucketName = await findS3Bucket();
    const owner = event.repository.owner.login;
    const action = event.action;

    switch (action) {
      case "queued":
        const runnerIds = await getAllHarrierRunners();

        const { instanceId, currentStatus } = await findSuitableRunner(
          runnerIds,
          s3BucketName
        );

        if (currentStatus === "busy") { // busy means: no idle or offline instances were found
          console.log(`⚠️ all harrier runners are busy at the moment`);
          console.error("**ec2 runner creation and cold start required**");
          // @Shane or @Wook
        } else if (currentStatus === "idle") {
          const startIdleEC2Script = makeScriptForIdleEC2(
            secret,
            owner,
            instanceId
          );

          await runCommand({
            DocumentName: "AWS-RunShellScript",
            InstanceIds: [instanceId],
            Parameters: { commands: [startIdleEC2Script] },
          });
        } else if (currentStatus === "offline") {
          console.log("found an offline instance: ", instanceId);
          await startStoppedInstance(instanceId);

          console.log(`waiting for offline instance to start...`);
        //   await waitUntilInstanceRunning(
        //     { client: ec2Client, maxWaitTime: MAX_WAITER_TIME_IN_SECONDS },
        //     { InstanceIds: [instanceId] }
        //   );

          const startOfflineEC2Script = makeScriptForOfflineEC2(
            secret,
            owner,
            instanceId,
            s3BucketName
          );

          throw new Error("❌❌❌❌❌");

          await runCommand({
            DocumentName: "AWS-RunShellScript",
            InstanceIds: [instanceId],
            Parameters: { commands: [startOfflineEC2Script] },
          });
        } else {
          // this should never be reached...
          console.log(`⚠️ this line should never be reached`);
        }

        await updateInstanceStatus(
          s3BucketName,
          instanceId,
          currentStatus,
          "busy" // nextStatus
        );
        break;
      case "completed":
        const existingEC2RunnerInstanceId = event.workflow_job.labels.at(-1); // this should always be an ec2 runner instanceId string value
        const delay = 3; // wait 3 minutes

        await invokeTimeoutLambda(existingEC2RunnerInstanceId, delay, s3BucketName);

        console.log(
          `✅ invoked 'timeout' lambda with args: invokeTimeoutLambda(${existingEC2RunnerInstanceId}, ${delay}, ${s3BucketName});`
        );
        break;
      case "in_progress":
        console.log("does this event matter?");
        console.log(`event received ${event.action}`);
        /* 
            grab instance_id info from event and check that instance's status
            some sort of modification of the state flagging values?
        */
        break;
      default:
        console.error(`❌ some unknown event.action was received...`);
        /* 
        some unknown event action was received...this should never occur
        */
        break;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        `✅ received and processed webhook event.action: ${action}`
      ),
    };
  } catch (error) {
    console.error(
      `❌ Unknown error encountered when invoking index.handler: `,
      error
    );
    throw new Error(`❌`);
  }
};