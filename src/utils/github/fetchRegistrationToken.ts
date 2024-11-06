import { Octokit } from "@octokit/core";
const org = "placeholder"; //  core.getInput("org"); // github personal access token

export default async () => {
  const options = {
    org,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  await Promise.resolve(options);
  //   console.log({ options });
  //   try {
  //     const response = await octokit.request(
  //       "POST /orgs/{org}/actions/runners/registration-token",
  //       options
  //     );
  //     console.log("Runner registration token:", response.data.token);
  //   } catch (error) {
  //     console.error("Error fetching registration token:", error);
  //   }
};
