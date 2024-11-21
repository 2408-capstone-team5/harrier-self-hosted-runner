// SEED THE S3 instance-status tracking data DURING SETUP ACTION!

import {
  SSMClient,
  SendCommandCommand,
  StartAutomationExecutionCommand,
} from "@aws-sdk/client-ssm";
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
const SSM_SEND_COMMAND_TIMEOUT = 40;

const MAX_WAITER_TIME_IN_SECONDS = 60 * 8;
const SECRET_NAME = "github/pat/harrier";

const [secretClient, ssmClient, ec2Client, s3Client] = [
  SecretsManagerClient,
  SSMClient,
  EC2Client,
  S3Client,
].map((client) => new client({ region: REGION }));

const makeScriptForStandbyEC2 = (secret, owner, instanceId) =>
  `#!/bin/bash
    echo "Start - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    echo $USER
    echo "Is user in docker group??"
    groups
    getent group docker

    cd /home/ec2-user/actions-runner

    unique_value=$(date +%s)               # maybe instead of the date, we can just pass in the harrierTag value as unique?
    name="Harrier Runner-$unique_value" 

    echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    response=$(curl -L -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted","${instanceId}"],"work_folder":"_work"}')

    # echo $response
    echo "After CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    runner_id=$(echo "$response" | jq '.runner.id')
    runner_name=$(echo "$response" | jq -r '.runner.name')
    encoded_jit_config=$(echo "$response" | jq -r '.encoded_jit_config')

    echo "Runner ID: $runner_id"
    echo "Runner Name: $runner_name"
    #echo "Encoded JIT Config: $encoded_jit_config"

    echo "Before cd .. - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    cd ..
    sudo chown ec2-user:ec2-user ./actions-runner
    cd actions-runner
    sudo chown ec2-user:ec2-user ./s3bucket

   

    # **removed s3 mount**



    # su - ec2-user -c "/home/ec2-user/actions-runner/run.sh --jitconfig $encoded_jit_config"
    su - ec2-user -c "newgrp docker && /home/ec2-user/actions-runner/run.sh --jitconfig $encoded_jit_config"

    echo "After su run.sh - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    echo "Done..."`;

const makeScriptForStoppedEC2 = (secret, owner, instanceId, s3BucketName) =>
  `#!/bin/bash
    echo "Start - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    echo $USER
    echo "Is user in docker group??"
    groups
    getent group docker

    cd /home/ec2-user/actions-runner

    unique_value=$(date +%s)               # maybe instead of the date, we can just pass in the harrierTag value as unique?
    name="Harrier Runner-$unique_value" 

    echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    response=$(curl -L -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted","${instanceId}"],"work_folder":"_work"}')

    # echo $response
    echo "After CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    runner_id=$(echo "$response" | jq '.runner.id')
    runner_name=$(echo "$response" | jq -r '.runner.name')
    encoded_jit_config=$(echo "$response" | jq -r '.encoded_jit_config')

    echo "Runner ID: $runner_id"
    echo "Runner Name: $runner_name"
    #echo "Encoded JIT Config: $encoded_jit_config"

    echo "Before cd .. - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    cd ..
    sudo chown ec2-user:ec2-user ./actions-runner
    cd actions-runner
    sudo chown ec2-user:ec2-user ./s3bucket

    echo "Before S3 Bucket Mount - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    su - ec2-user -c "mount-s3 ${s3BucketName} /home/ec2-user/actions-runner/s3bucket --allow-overwrite"

    echo "After S3 Bucket Mount - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

    # su - ec2-user -c "/home/ec2-user/actions-runner/run.sh --jitconfig $encoded_jit_config"
    su - ec2-user -c "newgrp docker && /home/ec2-user/actions-runner/run.sh --jitconfig $encoded_jit_config"

    echo "After su run.sh - $(date '+%Y-%m-%d %H:%M:%S-%3N')"
    echo "Done..."`;

const getSecret = async () => {
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
};

async function findS3Bucket() {
  const bucketList = await s3Client.send(new ListBucketsCommand({}));

  for (const bucket of bucketList.Buckets) {
    try {
      const taggingData = await s3Client.send(
        new GetBucketTaggingCommand({ Bucket: bucket.Name })
      );
      const bucketHasHarrierTag = !!taggingData.TagSet.some(
        (tag) => tag.Key === HARRIER_TAG_KEY && tag.Value === HARRIER_TAG_VALUE
      );

      if (!bucketHasHarrierTag) {
        throw new Error("❌ S3 bucket not found!");
      }

      console.log(`✅ Bucket found: ${bucket.Name}`);
      return bucket.Name;
    } catch (error) {
      console.error(`❌ Error fetching bucket ${bucket.Name}: `, error);
    }
  }
}

async function startInstance(instanceId) {
  try {
    console.log(`🚀 Starting instance: ${instanceId}`);
    const start = new StartInstancesCommand({ InstanceIds: [instanceId] });
    await ec2Client.send(start);
  } catch (error) {
    console.error("❌ Error starting instance:", error);
  }
}

async function stopInstance(instanceId) {
  try {
    const stop = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const response = await ec2Client.send(stop);
    console.log("✅ Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
}

async function sendCommandWithRetry(
  params,
  retries = SSM_SEND_COMMAND_TIMEOUT
) {
  for (let count = 0; count < retries; count++) {
    try {
      await ssmClient.send(new SendCommandCommand(params));
      return;
    } catch (error) {
      if (error.name === "InvalidInstanceId") {
        console.error(`⚠️ Retry ${count + 1}/${retries}`);
        await new Promise((res) => setTimeout(res, 500));
      } else {
        throw error;
      }
    }
  }
  throw new Error(`❌ SSM Send Command timed out after ${retries} tries!`);
}

async function runCommand(params) {
  try {
    await sendCommandWithRetry(params);
  } catch (error) {
    console.error("❌ Error running command:", error);
  }
}

/* 
setup harrier executes...
    - provisions ec2 and s3
    - installs some files on the ec2
    - eventually spin down and is STOPPED (what if we didn't stop the ec2 after setup?)

... ran a job successfully...

job is queued from github...
    - queued event is received by workflow lambda
    - pull in event.instance_id
    - deliver shell script to running ec2 instance based on event.instance_id
    - ec2 instance executes run.sh, becoming available for a workflow run

after a successful job is run (receiving 'completed' event)... 
    - invoke timed-termination lambda and stop the instance programmatically
    - has instance_id

*/
async function findInstance(state) {
  try {
    const describe = new DescribeInstancesCommand({
      Filters: [
        { Name: `tag:${HARRIER_TAG_KEY}`, Values: [HARRIER_TAG_VALUE] },
        // { Name: "instance-state-name", Values: [state] },
      ],
    });

    const data = await ec2Client.send(describe);

    if (data.Reservations?.length) {
      const instanceId = data.Reservations[0].Instances[0].InstanceId;
      console.log("✅ Found instance:", instanceId);
      return instanceId;
    } else {
      console.log("❌ No instances found with the specified state and tag.");
    }
  } catch (error) {
    console.error(
      "❌ Error finding instance:",
      error instanceof Error ? error.message : error
    );
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

async function findSuitableRunner(instanceIds) {
  try {
    for (const id of instanceIds) {
      const isStandby = await checkInstanceStatus(id, "standby");
      if (isStandby) {
        return { standbyInstanceId: id };
      }
    }

    for (const id of instanceIds) {
      const isStopped = await checkInstanceStatus(id, "stopped");
      if (isStopped) {
        return { stoppedInstanceId: id };
      }
    }

    console.log(`⚠️ no suitable harrier runners were found`);
    return null;
  } catch (error) {
    console.error(`❌ an error occurred when seeking a suitable runner`, error);
    throw new Error(`❌ findSuitableRunner failed`);
  }
}

const newHandler = async (event) => {
  if (event.zen) {
    return {
      statusCode: 200,
      body: JSON.stringify(`✅ Successful ping: ${event.zen}`),
    };
  }

  try {
    const action = event.action;

    switch (action) {
      case "queued":
        const harrierInstanceIds = await getAllHarrierRunners();
        const response = await findSuitableRunner(harrierInstanceIds);

        if (response === null) {
          /* 
            if there are no available instances (all are 'running')...
                coldstart new ec2 and deliver JIT config request & s3 mount script once the instance is ready
            */
        }

        if ("standbyInstanceId" in response) {
          /* 
            deliver the abbreviated JIT config script to that instance via SSM 
            & 
            update status of standing-by instance to status: 'running' in the s3 folder based on instance_id
            */
        }

        if ("stoppedInstanceId" in response) {
          // previous default scenario
          // send ssm command with the JIT request & s3 mount script to the located stopped instance
        }

        /* 
        filter harrierInstanceIds based on their "state" (based on each instance's status flag, in s3 or paramsmanager)


        if there are no available instances (all are 'running')...
            coldstart new ec2 and deliver JIT config request & s3 mount script once the instance is ready


        if a 'standing-by' ec2 is found then...
            deliver the abbreviated JIT config script to that instance via SSM 
            & 
            update status of standing-by instance to status: 'running' in the s3 folder based on instance_id
          

        if stopped... (current way)
            previous default scenario
            send ssm command with the JIT request & s3 mount script to the located stopped instance
        

        if stopping... 
            - timed retry mechanism for script delivery or X??
    */
        break;
      case "completed":
        /* 
        JIT self-hosted runner server has finished execution...

        execute lambdaZ(instance_id, time) which...
            - in `time`, check the 'status' flag of the instance in parameterManager/s3
            - if it is still in standby...stop the instance & set status flag to 'stopped'

        */
        break;
      case "in_progress":
        /* 
            grab instance_id info from event and check that instance's status
            some sort of modification of the state flagging values?
        */
        break;
      default:
        /* 
        some unknown event action was received...this should never occur
        */
        break;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(`✅ received and processed: ${action} action`),
    };
  } catch (error) {}
};

export const handler = async (event) => {
  if (event.zen) {
    return {
      statusCode: 200,
      body: JSON.stringify(`✅ Successful ping: ${event.zen}`),
    };
  }

  try {
    const action = event.action;

    // if (action === "queued") {

    //   const instanceId = await findInstance("stopped");
    //   if (!instanceId) {
    //     throw new Error("❌ Instance not found!");
    //   }

    //   const s3BucketName = await findS3Bucket();
    //   await startInstance(instanceId);
    //   await waitUntilInstanceRunning(
    //     { client: ec2Client, maxWaitTime: MAX_WAITER_TIME_IN_SECONDS },
    //     { InstanceIds: [instanceId] }
    //   );

    //   const secret = await getSecret();
    //   const owner = event.repository.owner.login;
    //   const startScript = makeScriptForStoppedEC2(
    //     secret,
    //     owner,
    //     instanceId
    //     s3BucketName,
    //   );

    //   await runCommand({
    //     DocumentName: "AWS-RunShellScript",
    //     InstanceIds: [instanceId],
    //     Parameters: { commands: [startScript] },
    //   });

    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(`✅ Successful handled ${action} action`),
    //   };
    // }

    // if (action === "completed") {
    //   const instanceId = await findInstance("running");
    //   if (!instanceId) {
    //     throw new Error("❌ Instance not found!");
    //   }
    //   // update instanceId's state (status and expirationTime)
    //   // trigger other and pass the instanceId
    //   await stopInstance(instanceId);
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(`✅ Successful handled ${action} action`),
    //   };
    // }

    // return {
    //   status: 200,
    //   body: JSON.stringify("unknown event received by lambda"),
    // };
  } catch (error) {
    console.error(`❌ Error invoking index.handler: `, error);
    throw error;
  }
};
