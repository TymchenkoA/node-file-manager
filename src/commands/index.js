import { goUp } from "./nav/up.js";
import { changeDir } from "./nav/cd.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { renameFile } from "./fs/rename.js";
import { remove } from "./fs/delete.js";
import { copy } from "./fs/copy.js";
import { move } from "./fs/move.js";
import { getFilesList } from "./fs/ls.js";
import { getOSInfo } from "./os/osInfo.js";
import { calculateHash } from "./hash/calcHash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";

export default {
    goUp,
    changeDir,
    read,
    create,
    renameFile,
    getFilesList,
    remove,
    copy,
    move,
    getOSInfo,
    calculateHash,
    compress,
    decompress
};
