import { SFNClient, CreateStateMachineCommand } from "@aws-sdk/client-sfn";

const client = new SFNClient({ region: "us-east-1" });

async function createSimpleStateMachine() {
  const stateMachineDefinition = JSON.stringify({
    StartAt: "CreateIAMRole",
    States: {
      CreateIAMRole: {
        Type: "Task",
        Resource: "arn:aws:states:::aws-sdk:iam:createRole",
        Parameters: {
          RoleName: "SimpleIAMRole",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: { Service: "lambda.amazonaws.com" },
                Action: "sts:AssumeRole",
              },
            ],
          },
        },
        Next: "PrintMessage",
      },
      PrintMessage: {
        Type: "Pass",
        Result: "IAM Role creation completed. This is a simple message.",
        ResultPath: "$.message",
        End: true,
      },
    },
  });

  const command = new CreateStateMachineCommand({
    name: "SimpleIAMCreationStateMachine",
    definition: stateMachineDefinition,
    roleArn: "arn:aws:iam::536697269866:role/StepFunctionsExecutionRole",
    type: "STANDARD",
  });

  try {
    const response = await client.send(command);
    console.log("State machine created:", response.stateMachineArn);
  } catch (error) {
    console.error("Error creating state machine:", error);
  }
}

void createSimpleStateMachine();
