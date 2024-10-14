import { createWriteStream, createReadStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream";
import { resolve } from "node:path";

import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const compress = async (rawPath, distRawPath) => {
  try {
    
    const path = resolve(rawPath);
    const distPath = resolve(distRawPath);

    const brotliCompress = createBrotliCompress();
    const source = createReadStream(path);
    const destination = createWriteStream(distPath);

    await pipeline(source, brotliCompress, destination, (err) => {
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
