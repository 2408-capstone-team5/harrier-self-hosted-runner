// import core from "@actions/core";
import { Octokit } from "@octokit/rest";

const auth = "placeholder"; //  core.getInput("personal-access-token"); // github personal access token
const org = "placeholder"; // core.getInput("org"); // github organization
const repo = "placeholder"; //  core.getInput("repo"); // github repository

export default async (url: string) => {
  try {
    const octokitOptions = {
      auth,
    };

    // const octokit = new Octokit(octokitOptions);

    const options = {
      org,
      repo,
      name: "web",
      active: true,
      events: ["workflow_job"],
      config: {
        url,
        content_type: "json",
        insecure_ssl: "0",
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };

    console.log({ options });

    // const response = await octokit.request(
    //   "POST /repos/{org}/{repo}/hooks",
    //   options
    // );
    // console.log("Webhook created:", response.data);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
};

// (async () => {
//   await getRegistrationToken();
//   await createWebhook();
//   console.log(EC2Client);
//   setTimeout(() => console.log("index.js file finished running..."), 5000);
// })();
