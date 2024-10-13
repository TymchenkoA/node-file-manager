import { goUp } from "./nav/up.js";
import { changeDir } from "./nav/cd.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { renameFile } from "./fs/rename.js";
import { remove } from "./fs/delete.js";
import { copy } from "./fs/copy.js";
import { getFilesList } from "./fs/ls.js";
import { getOSInfo } from "./os/osInfo.js";
import { calculateHash } from "./hash/calcHash.js";

export default {
    goUp,
    changeDir,
    read,
    create,
    renameFile,
    getFilesList,
    remove,
    copy,
    getOSInfo,
    calculateHash
};
