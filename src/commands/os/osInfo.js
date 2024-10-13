import { EOL, cpus, userInfo, arch } from "node:os";

import { getCurrentDir } from "../../utils/getCurrentDir.js";

const { username, homedir } = userInfo();

const getCPUSInfo = () => {
  let info = [`total amount of CPUS = ${cpus().length}`];

  cpus().map(({ model, speed }) => {
    info.push({
      model,
      speed: `${speed / 1000}GHz`,
    });
  });

  return info;
};

const paramKeys = {
  "--EOL": JSON.stringify(EOL),
  "--cpus": getCPUSInfo(),
  "--homedir": homedir,
  "--username": username,
  "--architecture": arch(),
};

export const getOSInfo = async (param) => {
  try {
    if (!param) {
      throw new Error(`Parameter is not specified`);
    }

    if (!paramKeys[param]) {
      throw new Error(`There is no such parameter`);
    }

    console.log(paramKeys[param]);
  } catch (err) {
    console.error(err);
  }

  getCurrentDir();
};
