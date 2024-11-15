import * as path from "path";
import { readFileSync } from "fs";
import { resolve } from "path";
const projectRoot = path.resolve(__dirname, "..", "..", "..", "..", "static");

export function getLambda(lambdaName: string) {
  const lambdaPath = path.join(
    projectRoot, // '/Users/joelbarton/Desktop/Capstone/harrier-dev/static/zippedLambdas/harrier-m3i1vc7w-eviction.zip'
    "zippedLambdas",
    `${lambdaName}.zip`
  );
  console.log({ lambdaName, projectRoot, lambdaPath, dirname: __dirname });
  console.log(`✅ zipped lambda RETRIEVED`);
  return readFileSync(resolve(lambdaPath));
}
