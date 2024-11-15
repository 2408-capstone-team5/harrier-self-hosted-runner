import * as fs from "fs";
import * as path from "path";
import * as archiver from "archiver";

const projectRoot = path.resolve(__dirname, "..", "..", "..", "..", "static");

export async function zipLambda(lambdaName: string) {
  try {
    const lambdaPath = path.join(
      projectRoot,
      "lambdas",
      lambdaName.split("-")[2]
    );
    const zipPath = path.join(
      projectRoot,
      "zippedLambdas",
      `${lambdaName}.zip`
    );

    fs.mkdirSync(path.dirname(zipPath), { recursive: true });

    const output = fs.createWriteStream(zipPath);
    const archive = archiver.create("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(
        `***zip operation***\nstatus: ✅ success ✅\nname: "${lambdaName}"\nsize: ${archive.pointer()} bytes\nlocation: static/zippedLambdas.`
      );
    });
    archive.pipe(output);
    archive.directory(lambdaPath, "");
    await archive.finalize();
  } catch (error: unknown) {
    console.error(
      `***zip operation***\nstatus: ❌ failed ❌\nname: "${lambdaName}"\nError: ${error}`
    );
  }
}
