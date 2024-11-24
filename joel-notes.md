/* 
        filter harrierInstanceIds based on their "state" (based on each instance's status flag, in s3 or paramsmanager)


        if there are no available instances (all are 'busy')...
            coldstart new ec2 and deliver JIT config request & s3 mount script once the instance is ready


        if a 'standing-by' ec2 is found then...
            deliver the abbreviated JIT config script to that instance via SSM 
            & 
            update status of standing-by instance to status: 'busy' in the s3 folder based on instance_id
          

        if stopped... (current way)
            previous default scenario
            send ssm command with the JIT request & s3 mount script to the located stopped instance
        

        if stopping... 
            - timed retry mechanism for script delivery or X??


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


// this functionality has been moved to the `timeout` lambda

// async function stopInstance(instanceId) {
//   try {
//     const stop = new StopInstancesCommand({ InstanceIds: [instanceId] });
//     const response = await ec2Client.send(stop);
//     console.log("✅ Stopping instance:", response.StoppingInstances);
//   } catch (error) {
//     console.error("❌ Error stopping instance:", error);
//   }
// }

// async function findInstance(state) {
//   try {
//     const describe = new DescribeInstancesCommand({
//       Filters: [
//         { Name: `tag:${HARRIER_TAG_KEY}`, Values: [HARRIER_TAG_VALUE] },
//         // { Name: "instance-state-name", Values: [state] },
//       ],
//     });

//     const data = await ec2Client.send(describe);

//     if (data.Reservations?.length) {
//       const instanceId = data.Reservations[0].Instances[0].InstanceId;
//       console.log("✅ Found instance:", instanceId);
//       return instanceId;
//     } else {
//       console.log("❌ No instances found with the specified state and tag.");
//     }
//   } catch (error) {
//     console.error(
//       "❌ Error finding instance:",
//       error instanceof Error ? error.message : error
//     );
//   }
// }

    */
