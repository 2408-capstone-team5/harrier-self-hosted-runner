/* 
    requires:
        - personal-access-token
        - org
        - repo  
*/

import axios from "axios";

// import core from "@actions/core";
const repo = "fake-setup-harrier-action"; // HARDCODED
const org = "2408-capstone-team5";
const pat = "ghp...";

export default async function setupWebhook(
  restApiId: string,
  stageName: "dev" | "prod" = "dev"
) {
  try {
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
