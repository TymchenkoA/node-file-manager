import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const calculateHash = async (rawPath) => {
  try {
    const path = resolve(rawPath);

    const hash = createHash("sha256");

    const input = createReadStream(path);

    input.on("readable", () => {
      const data = input.read();

      if (data) {
        hash.update(data);
      } else {
        console.log(`${hash.digest("hex")}`);
      }
    });

    input.on("end", () => {
      getCurrentDir();
    });

    input.on("error", (err) => {
      console.error("Operation failed");
      getCurrentDir();
    });
  } catch (err) {
    console.error("Operation failed");
    getCurrentDir();
  }
};
