import { readdir, stat } from "node:fs/promises";
import path from "path";
import { getCurrentDir } from "../../utils/getCurrentDir.js";

export const getFilesList = async () => {
  try {
    const filesAndDirs = await readdir(process.cwd());
    let dirsList = [];
    let filesList = [];

    await Promise.all(
      filesAndDirs
        .map(async (file) => {
          const fullPath = path.join(process.cwd(), file);

          let stats = await stat(fullPath);

          if (stats.isDirectory()) {
            dirsList.push({
              Name: file,
              Type: "directory",
            });
          }

          if (stats.isFile()) {
            filesList.push({
              Name: file,
              Type: "file",
            });
          }
        })
    );

    const sortedDirs = dirsList.sort((a, b) => a.Name.localeCompare(b.Name));
    const sortedFiles = filesList.sort((a, b) => a.Name.localeCompare(b.Name));

    console.table([...sortedDirs, ...sortedFiles]);
  } catch (err) {
    console.error("Operation failed");
  }

  getCurrentDir();
};
