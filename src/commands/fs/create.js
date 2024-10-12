import { writeFile } from "fs/promises";
import path from "node:path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const create = async (file) => {
  try {
    const filePath = path.resolve(process.cwd(), file);
    await writeFile(filePath, "");
    getCurrentDir();
  } catch (err) {
    console.error("Operation failed");
  }
};
