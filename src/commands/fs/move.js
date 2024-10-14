import { unlink } from "fs/promises";
import { createReadStream, createWriteStream, mkdir } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";

import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const move = async (rawFilePath, distRawPath) => {
  try {
    const filePath = resolve(rawFilePath);
    const distDirPath = resolve(distRawPath);
    const distPath = join(distDirPath, basename(filePath));

    await new Promise((resolve, reject) => {
      mkdir(dirname(distPath), { recursive: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const readStream = createReadStream(filePath, { encoding: "utf8" });
    const writeStream = createWriteStream(distPath, { flags: "w" });

    await readStream.pipe(writeStream);

    readStream.on("error", (err) => {
      console.error("Operation failed");
    });

    writeStream.on("error", (err) => {
      console.error("Operation failed");
    });

    writeStream.on("finish", () => {
        unlink(filePath);
    });

  } catch (err) {
    console.error("Operation failed");
  }

  getCurrentDir();
};
