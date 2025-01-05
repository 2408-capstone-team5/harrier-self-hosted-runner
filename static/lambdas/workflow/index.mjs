// SEED the s3 instance-status tracking data DURING SETUP ACTION!
// MODIFY this lambda's permissions/assumed role's policy statements to allow for lambda-invocation

import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";
import {
  EC2Client,
  DescribeInstancesCommand,
  StartInstancesCommand,
  waitUntilInstanceRunning,
  RunInstancesCommand,
  waitUntilInstanceStatusOk,
  StopInstancesCommand,
} from "@aws-sdk/client-ec2";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  GetBucketTaggingCommand,
} from "@aws-sdk/client-s3";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const {
  REGION,
  SECRET_NAME,
  HARRIER_TAG_KEY,
  HARRIER_TAG_VALUE,
  SSM_SEND_COMMAND_TIMEOUT, // these are both strings
  MAX_WAITER_TIME_IN_SECONDS,
  TIMEOUT_LAMBDA_NAME,
  TIMEOUT_LAMBDA_DELAY,
} = process.env;

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

    for i in $(seq 1 $X); do
      echo "Iteration $i - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      name="${instanceId}"

      echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

     response=$(curl -L \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted"],"work_folder":"_work"}')

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

      name="${instanceId}"

      echo "Before CURL - $(date '+%Y-%m-%d %H:%M:%S-%3N')"

      response=$(curl -L \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${secret}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/orgs/${owner}/actions/runners/generate-jitconfig \
        -d '{"name":"'"$name"'","runner_group_id":1,"labels":["self-hosted"],"work_folder":"_work"}')

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
        console.warn(
          `❌ Error fetching or checking tags of bucket ${bucket.Name}: `,
          error
        );
      }
    }
  }

  throw new Error(
    `❌ An S3 bucket with ${HARRIER_TAG_KEY}: ${HARRIER_TAG_VALUE} was not found!`
  );
}

async function runCommand(params) {
  const retries = parseInt(SSM_SEND_COMMAND_TIMEOUT);
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

async function startStoppedInstance(instanceId) {
  // stopped or 'offline'
  try {
    console.log(`🚀 Starting a stopped instance: ${instanceId}`);
    const start = new StartInstancesCommand({ InstanceIds: [instanceId] });
    await ec2Client.send(start);
  } catch (error) {
    console.error(`❌ Error starting a stopped instance: ${instanceId}`, error);
  }
}

async function getAllHarrierRunners(s3BucketName) {
  try {
    // Given that we can have random EC2s floating around after a re-install, a better approach
    // may be to grab instance IDs from the S3 bucket.

    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: s3BucketName,
        Prefix: "runner-statuses/",
      })
    );

    const instanceIds = response.Contents.map(
      (object) => object.Key.split(/[/.]/)[1]
    );
    console.log("Harrier instances located from S3: ", instanceIds);

    // const describe = new DescribeInstancesCommand({
    //   Filters: [
    //     { Name: `tag:${HARRIER_TAG_KEY}`, Values: [HARRIER_TAG_VALUE] },
    //   ],
    // });
    // const response = await ec2Client.send(describe);

    // const instanceIds = response.Reservations.flatMap((res) =>
    //   res.Instances.map((instance) => instance.InstanceId)
    // );

    // if (!instanceIds.length) {
    //   throw new Error(`❌ 0 Harrier-tagged instances located`);
    // }

    // console.log(`${instanceIds.length} Harrier-tagged instances located`);
    return instanceIds;
  } catch (error) {
    console.error(`❌ Error fetching Harrier-tagged instance ids: `, error);
    throw new Error(`❌ the getAllHarrierRunners function failed`);
  }
}

async function checkInstanceStatus(
  s3BucketName,
  instanceId,
  searchedForStatus,
  runDetails
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

    const compareDetails = () => {
      const { timeStamp: lastTimeStamp, ...lastRun } = instanceState.lastRun;
      const { timeStamp: currentTimeStamp, ...currentRun } = runDetails;

      for (const property of Object.keys(currentRun)) {
        if (lastRun[property] !== currentRun[property]) {
          return false;
        }
      }

      return true;
    };

    if (searchedForStatus === "idle") {
      return instanceState.status === searchedForStatus && compareDetails();
    } else {
      return instanceState.status === searchedForStatus; // if the strings match, return true
    }
  } catch (error) {
    if (error.name === "NoSuchKey") {
      console.warn(`⚠️ Key not found for instanceId: ${instanceId}`);
      return false; // Return false since the key doesn't exist
    }
    console.error(`❌ error in checkInstanceStatus`, error);
    throw new Error(`❌ checkInstanceStatus failed`);
  }
}

async function findSuitableRunner(instanceIds, s3BucketName, runDetails) {
  try {
    for (const id of instanceIds) {
      const isIdle = await checkInstanceStatus(
        s3BucketName,
        id,
        "idle",
        runDetails
      );
      if (isIdle) {
        return { instanceId: id, currentStatus: "idle" };
      }
    }

    for (const id of instanceIds) {
      const isOffline = await checkInstanceStatus(
        s3BucketName,
        id,
        "offline",
        runDetails
      );
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
  nextStatus,
  lastRunDetails
) {
  try {
    const statusObject = {
      status: nextStatus,
      lastRun: lastRunDetails,
    };
    const statusString = JSON.stringify(statusObject);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: `runner-statuses/${instanceId}.json`,
        Body: statusString,
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

async function describeInstance(instanceId) {
  try {
    const params = { InstanceIds: [instanceId] };
    const describeInstancesCommand = new DescribeInstancesCommand(params);

    const instanceDetails = await ec2Client.send(describeInstancesCommand);

    const amiId = instanceDetails.Reservations[0].Instances[0].ImageId;
    const instanceType =
      instanceDetails.Reservations[0].Instances[0].InstanceType;
    const keyName = instanceDetails.Reservations[0].Instances[0].KeyName;
    const securityGroupIds = [
      instanceDetails.Reservations[0].Instances[0].SecurityGroups[0].GroupId,
    ];
    const subnetId =
      instanceDetails.Reservations[0].Instances[0].NetworkInterfaces[0]
        .SubnetId;
    const iamInstanceProfile = {
      Arn: instanceDetails.Reservations[0].Instances[0].IamInstanceProfile.Arn,
    };
    const harrierHash =
      instanceDetails.Reservations[0].Instances[0].SecurityGroups[0].GroupName.split(
        "-"
      )[1];

    return {
      amiId,
      instanceType,
      keyName,
      securityGroupIds,
      subnetId,
      iamInstanceProfile,
      harrierHash,
    };
  } catch {
    console.error(`Error describing EC2 instance: ${instanceId}:`, error);
    throw error;
  }
}

async function getNextEC2PoolId(s3BucketName) {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: "runner-statuses/nextId.json",
      })
    );

    const bodyString = await streamToString(response.Body);
    const nextId = JSON.parse(bodyString).nextId;

    return nextId;
  } catch (error) {
    console.error(`Error fetching next EC2 pool ID: `, error);
    throw error;
  }
}

function makeScriptForNewEC2() {
  return `#!/bin/bash
  echo "Starting setup.sh script"

  # Update the package list
  sudo apt-get update -y

  echo "cd /home/"
  cd /home/
  echo "cd ubuntu"
  cd ubuntu

  # Install jq
  sudo apt install -y jq

  # Install build-essentials
  echo "%%%% before build-essentials install %%%%";
  sudo apt install -y build-essential
  echo "%%%% after build-essentials install %%%%";

  # Install GitHub Actions Self-Hosted Runner
  # Create a folder and switch to it.
  echo "mkdir actions-runner"
  mkdir actions-runner

  sudo chown ubuntu:ubuntu ./actions-runner
  cd actions-runner

  # Download the latest runner package
  echo "DOWNLOAD GITHUB ACTIONS RUNNER"
  curl -o actions-runner-linux-x64-2.320.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-linux-x64-2.320.0.tar.gz
  # Extract the installer
  echo "*** EXTRACT GITHUB ACTIONS RUNNER ***"
  tar xzf ./actions-runner-linux-x64-2.320.0.tar.gz

  # Need to install this to get .config.sh to work
  echo "*** INSTALL LIBICU ***"
  sudo apt update && sudo apt install -y libicu-dev

  # Install Git
  echo "*** INSTALL GIT ***"
  sudo apt install -y git

  # Download Mountpoint
  echo "**** DOWNLOAD MOUNTPOINT ***"
  sudo wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb

  # install Mountpoint
  echo "**** INSTALL MOUNTPOINT ***"
  sudo apt install -y ./mount-s3.deb

  echo "**** MKDIR S3BUCKET ***"
  mkdir s3bucket
  sudo chown ubuntu:ubuntu ./s3bucket
  echo "**** SUDO MKDIR S3BUCKET ***"
  sudo mkdir s3bucket

  # Install Docker
  echo "INSTALL DOCKER"
  sudo apt-get install -y docker.io

  # Give current user some permissions
  echo "Give current user some permissions!!!!"
  echo $USER
  echo "*** CALL - sudo usermod -aG docker $USER ***"
  sudo usermod -aG docker $USER
  sudo usermod -aG docker ubuntu
  echo "*** ALSO TRY - usermod -aG docker $USER ***"
  usermod -aG docker $USER
  usermod -aG docker ubuntu

  # Start Docker deamon and set to start-up on reboots
  echo "START DOCKER DAEMON AND SET TO START-UP AUTOMATICALLY ON REBOOTS"
  sudo systemctl start docker
  sudo systemctl enable docker
  groups
  getent group docker
  echo "!!!!!!!!  END OF START SCRIPT !!!!!!"`;
}

async function createEC2(instanceProps, nextPoolId) {
  const userDataScript = makeScriptForNewEC2();
  const userData = Buffer.from(userDataScript).toString("base64");

  const params = {
    ImageId: instanceProps.amiId, // AMI ID for the instance
    InstanceType: instanceProps.instanceType, // EC2 instance type
    KeyName: instanceProps.keyName,
    MinCount: 1, // Minimum instances to launch
    MaxCount: 1, // Maximum instances to launch
    BlockDeviceMappings: [
      {
        DeviceName: "/dev/sda1",
        Ebs: {
          VolumeSize: 16, // Size of the volume in GB
          VolumeType: "gp3",
        },
      },
    ],
    SecurityGroupIds: instanceProps.securityGroupIds, // Security group IDs
    SubnetId: instanceProps.subnetId, // Subnet ID (optional)
    IamInstanceProfile: instanceProps.iamInstanceProfile, // IAM resource profile
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [
          {
            Key: "Name",
            Value: `harrier-${instanceProps.harrierHash}-ec2-${nextPoolId}`,
          },
          { Key: "Agent", Value: "Harrier-Runner" },
        ],
      },
    ], // Instance tags
    UserData: userData, // UserData (must be base64 encoded)
  };

  const runInstancesCommand = new RunInstancesCommand(params);

  try {
    const instanceData = await ec2Client.send(runInstancesCommand);
    const instanceId = instanceData.Instances[0].InstanceId;

    console.log(`✅ Successfully created instance with ID: ${instanceId}\n`);
    return instanceId;
  } catch (error) {
    throw new Error(`❌ Error creating EC2 instance: ${error}`);
  }
}

async function waitEC2StatusOk(instanceIds) {
  try {
    console.log("Waiting until STATUS OK...");
    const MAX_WAITER_TIME_IN_SECONDS = 60 * 3;
    const startTime = new Date();
    await waitUntilInstanceStatusOk(
      {
        client: ec2Client,
        maxWaitTime: MAX_WAITER_TIME_IN_SECONDS,
      },
      { InstanceIds: instanceIds }
    );
    const endTime = new Date();
    console.log(
      "✅ STATUS OK Succeeded after time: ",
      (endTime.getTime() - startTime.getTime()) / 1000
    );
  } catch (error) {
    error.message = `${error.message}. Try increasing the maxWaitTime in the waiter.`;
    console.error(error);
  }
}

async function stopEC2s(instanceIds) {
  try {
    const command = new StopInstancesCommand({ InstanceIds: instanceIds });
    const response = await ec2Client.send(command);
    console.log("Stopping instance:", response.StoppingInstances);
  } catch (error) {
    console.error("❌ Error stopping instance:", error);
  }
}

async function setupNextEC2(instanceProps, nextPoolId) {
  try {
    const instanceId = await createEC2(instanceProps, nextPoolId);
    const instanceIds = [instanceId];
    await waitEC2StatusOk(instanceIds);
    await stopEC2s(instanceIds);
    return instanceId;
  } catch (error) {
    console.error(`Error creating next EC2: `, error);
    throw error;
  }
}

async function updateNextPoolId(s3BucketName, nextPoolId) {
  try {
    const nextIDObject = {
      nextId: nextPoolId,
    };
    const nextIDString = JSON.stringify(nextIDObject);
    const idCommand = new PutObjectCommand({
      Bucket: s3BucketName,
      Key: `runner-statuses/nextId.json`,
      Body: nextIDString,
      ContentType: "application/json",
    });
    await s3Client.send(idCommand);
  } catch (error) {
    console.error("Error updating next EC2 pool ID: ", error);
  }
}

// async function updateEC2PoolStatus(s3BucketName, nextPoolId, nextInstanceId) {
//   try {
//     const nextIDObject = {
//       nextId: nextPoolId,
//     };
//     const nextIDString = JSON.stringify(nextIDObject);

//     const idCommand = new PutObjectCommand({
//       Bucket: s3BucketName,
//       Key: `runner-statuses/nextId.json`,
//       Body: nextIDString,
//       ContentType: "application/json",
//     });
//     await s3Client.send(idCommand);

//     const statusObject = {
//       status: "offline",
//     };
//     const statusString = JSON.stringify(statusObject);

//     const statusCommand = new PutObjectCommand({
//       Bucket: s3BucketName,
//       Key: `runner-statuses/${nextInstanceId}.json`,
//       Body: statusString,
//       ContentType: "application/json",
//     });
//     await s3Client.send(statusCommand);

//     console.log("Successfully updated next EC2 pool status");
//   } catch (error) {
//     console.error("Error updating next EC2 pool status: ", error);
//   }
// }

async function invokeTimeoutLambda(
  instanceId,
  delayInMinutes,
  s3BucketName,
  timeoutFunctionName,
  lastRunDetails
) {
  try {
    const invoke = new InvokeCommand({
      FunctionName: timeoutFunctionName,
      Payload: JSON.stringify({
        instanceId,
        delayInMinutes,
        s3BucketName,
        lastRunDetails,
      }),
    });

    const response = await lambdaClient.send(invoke);

    console.log(
      `✅ ${timeoutFunctionName} invoked successfully with Payload: `,
      JSON.parse(new TextDecoder("utf-8").decode(response.Payload))
    );
  } catch (error) {
    console.error(`Error invoking ${timeoutFunctionName}:`, error);
    throw error;
  }
}

export const handler = async (event) => {
  if ("zen" in event) {
    return {
      statusCode: 200,
      body: JSON.stringify(`✅ Successful ping: ${event.zen}`),
    };
  }

  const label = event.label;
  console.log(label);
  if (label !== "self-hosted") {
    return {
      statusCode: 202,
      body: JSON.stringify(`Webhook not for self-hosted received: ${event.label}`),
    };
  }

  try {
    const secret = await getSecret();
    const s3BucketName = await findS3Bucket();
    const owner = event.repository.owner.login;
    const action = event.action;

    const runDetails = {
      timeStamp: new Date().toISOString(),
      user: event.sender.login,
      organization: event.organization.login,
      repository: event.repository.name,
      branch: event.workflow_job.head_branch,
      workflow: event.workflow_job.workflow_name,
      job: event.workflow_job.name,
    };

    switch (action) {
      case "queued":
        const runnerIds = await getAllHarrierRunners(s3BucketName);

        const { instanceId, currentStatus } = await findSuitableRunner(
          runnerIds,
          s3BucketName,
          runDetails
        );

        if (currentStatus === "busy") {
          // busy means: no idle or offline instances were found
          console.log(`⚠️ all harrier runners are busy at the moment`);
          console.error("**ec2 runner creation and cold start required**");
          // @Shane or @Wook
        } else if (currentStatus === "idle") {
          console.log("found an idle instance: ", instanceId);

          await updateInstanceStatus(
            s3BucketName,
            instanceId,
            "busy", // nextStatus
            runDetails
          );

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

          await updateInstanceStatus(
            s3BucketName,
            instanceId,
            "busy", // nextStatus
            runDetails
          );

          await startStoppedInstance(instanceId);

          console.log(`waiting for offline instance to start...`);
          //   await waitUntilInstanceRunning(
          //     { client: ec2Client, maxWaitTime: parseInt(MAX_WAITER_TIME_IN_SECONDS) },
          //     { InstanceIds: [instanceId] }
          //   );

          const startOfflineEC2Script = makeScriptForOfflineEC2(
            secret,
            owner,
            instanceId,
            s3BucketName
          );

          await runCommand({
            DocumentName: "AWS-RunShellScript",
            InstanceIds: [instanceId],
            Parameters: { commands: [startOfflineEC2Script] },
          });

          const instanceProps = await describeInstance(instanceId);
          console.log({ instanceProps });

          const nextPoolId = await getNextEC2PoolId(s3BucketName);
          console.log(nextPoolId);

          await updateNextPoolId(s3BucketName, nextPoolId + 1);

          const newInstanceId = await setupNextEC2(instanceProps, nextPoolId);
          console.log("Set up new EC2 instance: ", newInstanceId);

          // await updateEC2PoolStatus(
          //   s3BucketName,
          //   nextPoolId + 1,
          //   newInstanceId
          // );

          await updateInstanceStatus(
            s3BucketName,
            newInstanceId,
            "offline",
            {}
          );
        } else {
          // this should never be reached...
          console.log(`⚠️ this line should never be reached`);
        }
        break;
      case "completed":
        const existingEC2RunnerInstanceId = event.workflow_job.runner_name; // @wook this value seems to be undefined
        const delay = parseInt(TIMEOUT_LAMBDA_DELAY, 10); // wait time set by user, default 1 minute

        // Workflow completed should indicate that the EC2 is no longer running a job, thus need to toggle state to "idle"
        await updateInstanceStatus(
          s3BucketName,
          existingEC2RunnerInstanceId,
          "idle", // nextStatus
          runDetails
        );

        await invokeTimeoutLambda(
          existingEC2RunnerInstanceId,
          delay,
          s3BucketName,
          TIMEOUT_LAMBDA_NAME,
          runDetails
        );

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
    throw new Error(`❌ workflow lambda failed`);
  }
};
