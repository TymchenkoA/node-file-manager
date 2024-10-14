import { createWriteStream, createReadStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { resolve } from "node:path";

import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const decompress = async (rawPath, distRawPath) => {
  try {
    const path = resolve(rawPath);
    const distPath = resolve(distRawPath);

    const brotliUnzip = createBrotliDecompress();
    const source = createReadStream(path);
    const destination = createWriteStream(distPath);

    await pipeline(source, brotliUnzip, destination, (err) => {
      if (err) {
        console.error("Operation failed");
        process.exitCode = 1;
      }
    });
  } catch (err) {
    console.error("Operation failed");
  }

  getCurrentDir();
};
