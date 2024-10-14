import { rename } from "fs/promises";
import { resolve, dirname } from "node:path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const renameFile = async (oldName, newName) => {
  try {
    const oldFilePath = resolve(oldName);
    const newFilePath = resolve(dirname(oldFilePath), newName);

    await rename(oldFilePath, newFilePath);

  } catch (err) {
    console.error("Operation failed");
  }
  getCurrentDir();
};
