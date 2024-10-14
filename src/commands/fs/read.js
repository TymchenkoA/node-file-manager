import { createReadStream } from "node:fs";
import os from "node:os";
import path from "node:path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const read = async (rawPath) => {
  const filePath = path.resolve(rawPath);
  let data = "";

  const readStream = createReadStream(filePath, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    data += chunk;
  });

  readStream.on("end", () => {
    console.log(`${data}${os.EOL}`);
    getCurrentDir();
  });

  readStream.on("error", (err) => {
    console.error("Operation failed");
    getCurrentDir();
  });
};
