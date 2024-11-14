import axios from "axios";
import { configHarrier } from "../../config/configHarrier";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export async function setupOrgWebhook(
  restApiId: string,
  stageName: "dev" | "prod" = "dev"
) {
  try {
    const pat = await getPat();
    const org = configHarrier.org;

    const response = await axios.post(
      `https://api.github.com/orgs/${org}/hooks`,
      {
        config: {
          url: `https://${restApiId}.execute-api.us-east-1.amazonaws.com/${stageName}/workflow`,
          content_type: "json",
          insecure_ssl: "0",
        },
        events: ["workflow_job"],
        active: true,
        name: "web",
      },
      {
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log("✅ Organization webhook created successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "❌ Error creating organization webhook:",
        error.response?.data
      );
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
}

async function getPat() {
  const secretClient = new SecretsManagerClient({
    region: configHarrier.region,
  });

  const secretResponse = await secretClient.send(
    new GetSecretValueCommand({
      SecretId: "github/pat/harrier",
      VersionStage: "AWSCURRENT",
    })
  );

  const pat = secretResponse.SecretString;
  return pat;
}
