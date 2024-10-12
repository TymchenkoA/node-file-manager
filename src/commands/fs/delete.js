import { unlink } from "fs/promises";
import path from "node:path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const remove = async (file) => {
  try {
    const filePath = path.resolve(process.cwd(), file);
    await unlink(filePath);
    getCurrentDir();
    
  } catch (err) {
    console.error("Operation failed");
  }
};
