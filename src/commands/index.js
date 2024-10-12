import { goUp } from "./nav/up.js";
import { changeDir } from "./nav/cd.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
// import { rename } from "./fs/rename.js";
import { getFilesList } from "./fs/ls.js";


export default {
    goUp,
    changeDir,
    read,
    create,
    // rename,
    getFilesList
};