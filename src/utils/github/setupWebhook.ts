import axios from "axios";
import { configHarrier } from "../../config/configHarrier";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// import core from "@actions/core";
async function getPat() {
  const repo = "fake-setup-harrier-action";
  const org = "2408-capstone-team5";
  // const pat = "ghp_...";

  const secretClient = new SecretsManagerClient({
    region: configHarrier.region,
  });

  const secretResponse = await secretClient.send(
    new GetSecretValueCommand({
      SecretId: "github/token/harrier",
      VersionStage: "AWSCURRENT",
    })
  );

  return { repo, org, pat: secretResponse.SecretString };
}

export default async function setupWebhook(
  restApiId: string,
  stageName: "dev" | "prod" = "dev"
) {
  try {
    const { repo, org, pat } = await getPat();

    const response = await axios.post(
      `https://api.github.com/repos/${org}/${repo}/hooks`,
      {
        config: {
          url: `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/workflow`,
          content_type: "json",
          insecure_ssl: "0",
        },
        events: ["workflow_job"],
        active: true,
        name: "web",
        owner: org,
        repo,
      },
      {
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log("✅ Webhook created successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating webhook:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

// const getRegistrationToken = async () => {
//   try {
//     const response = await octokit.request(
//       "POST /orgs/{org}/actions/runners/registration-token",
//       {
//         org: core.getInput("org"),
//         headers: {
//           "X-GitHub-Api-Version": "2022-11-28",
//         },
//       }
//     );
//     console.log("Runner registration token:", response.data.token);
//     return response.data.token;
//   } catch (error) {
//     console.error("Error fetching registration token:", error);
//   }
// };
