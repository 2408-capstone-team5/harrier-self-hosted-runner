import core from "@actions/core";
import { Octokit } from "@octokit/rest";

const auth = core.getInput("personal-access-token");
const org = core.getInput("org");
const repo = core.getInput("repo");
console.log({ auth, org, repo });

const octokit = new Octokit({ auth });

// TODO: ask WOOK/JESSE how this would work with the JIT token!
const getRegistrationToken = async () => {
  const options = {
    org,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  console.log({ options });
  try {
    const response = await octokit.request(
      "POST /orgs/{org}/actions/runners/registration-token",
      options
    );
    console.log("Runner registration token:", response.data.token);
  } catch (error) {
    console.error("Error fetching registration token:", error);
  }
};

const constructPayloadUrl = (
  restApiId: string,
  stageName: "test" | "prod" = "test",
  resource: "test" = "test"
) => {
  // TODO: region shouldn't be hardcoded
  return `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/${resource}`;
};

export default async function setupWorkflowWebhook(
  restApiId: string,
  stageName: "test" | "prod" = "test"
) {
  const payloadUrl = constructPayloadUrl(restApiId, stageName, "test");

  const options = {
    org,
    repo,
    name: "web",
    active: true,
    events: ["workflow_job"],
    config: {
      url: payloadUrl, // request bin url for testing purposes
      content_type: "json",
      insecure_ssl: "0",
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  console.log({ options });

  try {
    const response = await octokit.request(
      "POST /repos/{org}/{repo}/hooks",
      options
    );
    console.log("Webhook created:", response.data);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
}
