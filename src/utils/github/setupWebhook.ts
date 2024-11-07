/* 
    requires:
        - personal-access-token
        - org
        - repo  
*/

import axios from "axios";
// import core from "@actions/core";
// import { Octokit } from "@octokit/core";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const { Octokit } = require("@octokit/core");

// const configureGithubWebhookOptions = (
//   restApiId: string,
//   stageName: string,
//   org: string,
//   repo: string
// ) =>
// };

export default async function setupWebhook(
  restApiId: string,
  stageName: "test" | "prod" = "test"
) {
  try {
    const response = await axios.post(
      `https://api.github.com/repos/2408-capstone-team5/fake-setup-harrier-action/hooks`,
      {
        config: {
          url: `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/test`,
          content_type: "json",
          insecure_ssl: "0",
        },
        events: ["workflow_job"],
        active: true,
        name: "web",
        owner: "2408-capstone-team5",
        repo: "fake-setup-harrier-action",
      },
      {
        headers: {
          Authorization: `Bearer pat`, // I've been hardcoding a PAT here for testing purposes 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
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log("Webhook created successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating webhook:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

//   const octokit = new Octokit({
//     auth: "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",
//     baseUrl: "https://api.github.com",
//   });

//   await octokit.request("POST /repos/{org}/{repo}/hooks", options);
// TODO: ask WOOK/JESSE how this would work with the JIT token!
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

// const constructPayloadUrl = (
//   restApiId: string,
//   stageName: "test" | "prod" = "test",
//   resource: "test" = "test"
// ) => {
//   // TODO: region shouldn't be hardcoded
//   return `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/${resource}`;
// };

//   const options = {
//     org: "2408-capstone-team5",
//     repo: "fake-setup-harrier-action",
//     name: "web",
//     active: true,
//     events: ["workflow_job"],
//     config: {
//       url: `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/test`,
//       content_type: "json",
//       insecure_ssl: "0",
//     },
//     headers: {
//       "X-GitHub-Api-Version": "2022-11-28",
//       Authorization: `Bearer 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`,
//     },
//   };

//   const response = await axios.post(
//     `https://api.github.com/repos/${options.org}/${options.repo}/hooks`,
//     options
//   );
