import * as path from "path";
import { readFileSync } from "fs";
import { resolve } from "path";
const projectRoot = path.resolve(__dirname, "..", "..", "..", "..", "static");

export function getLambda(lambdaName: string) {
  const lambdaPath = path.join(
    projectRoot,
    "zippedLambdas",
    `${lambdaName}.zip`
  );
  return readFileSync(resolve(lambdaPath));
}
