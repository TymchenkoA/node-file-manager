import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const goUp = async () => {
  try {
    process.chdir("..");
  } catch (err) {
    console.error("Operation failed");
  }

  getCurrentDir();
};
