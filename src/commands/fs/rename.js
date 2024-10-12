import { rename } from "fs/promises";
import path from "node:path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const renameFile = async (oldName, newName) => {
  try {
    const oldFilePath = path.resolve(process.cwd(), oldName);
    const newFilePath = path.resolve(process.cwd(), newName);

    await rename(oldFilePath, newFilePath);
    getCurrentDir();
    
  } catch (err) {
    console.error("Operation failed");
  }
};
