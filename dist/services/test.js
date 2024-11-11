"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_sfn_1 = require("@aws-sdk/client-sfn");
const client = new client_sfn_1.SFNClient({ region: "us-east-1" });
function createSimpleStateMachine() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const command = new client_sfn_1.CreateStateMachineCommand({
            name: "SimpleIAMCreationStateMachine",
            definition: stateMachineDefinition,
            roleArn: "arn:aws:iam::536697269866:role/StepFunctionsExecutionRole",
            type: "STANDARD",
        });
        try {
            const response = yield client.send(command);
            console.log("State machine created:", response.stateMachineArn);
        }
        catch (error) {
            console.error("Error creating state machine:", error);
        }
    });
}
void createSimpleStateMachine();
