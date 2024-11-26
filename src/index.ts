import { cleanupPrevInstall } from "./services/cleanupPrevInstall";
import { setupVPC } from "./services/setupVPC";
import { setupS3CacheBucket } from "./services/setupS3CacheBucket";
import { setupEC2Runner } from "./services/setupEC2Runner";
import { setupApiAndWebhook } from "./services/setupApiAndWebhook";
import { setupRoles } from "./services/setupRoles";
import { setupCacheEviction } from "./services/setupCacheEviction";

let deleteHarrier = false;

const processCmdLineArgs = () => {
  const args = process.argv.slice(2);
  let clean = false;

  const nameArgIndex = args.indexOf("--clean");
  if (nameArgIndex !== -1) {
    clean = true;
    console.log(`*** Clean Only!***`);
  }

  const options = {
    clean,
  };
  return options;
};

const main = async () => {
  try {
    const cmdLineOptions = processCmdLineArgs();
    deleteHarrier = cmdLineOptions.clean;

    await cleanupPrevInstall();

    if (deleteHarrier) {
      console.log(
        "=> Only performing cleanup of previous installation, without installing a new Harrier setup.\n" +
          "✅ Successfully deleted Harrier from AWS account.\n"
      );
      return;
    }

    await setupRoles(); // IAM

    await setupVPC();

    await setupEC2Runner();

    await setupS3CacheBucket(); // S3

    await setupCacheEviction();

    await setupApiAndWebhook();
  } catch (error) {
    console.error("Error executing main in index: ", error);
    throw new Error("❌");
  }
};

void main();