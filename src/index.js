import { homedir } from "node:os";
import { getUserInput } from "./controller.js";
import { goUp } from "./commands/nav/up.js";
import { changeDir } from "./commands/nav/cd.js";
import { read } from "./commands/fs/read.js";
import { getFilesList } from "./commands/fs/ls.js";
import { getCurrentDir } from "./utils/getCurrentDir.js";

process.chdir(homedir());

const handleUserCommand = (input) => {
  const [command, ...args] = input.split(" ");
  // console.log(command);
  // console.log(args);

  switch (command) {
    case "up":
      goUp();
      break;
    case "cd":
      changeDir(args[0]);
      break;
    case "ls":
      getFilesList();
      break;
    case "cat":
      read(args[0]);
      break;
    default:
      console.log("Unknown command");
  }
};

const runApp = async () => {
  const shell = process.env.SHELL || process.env.ComSpec || "unknown shell";
  let user = "";

  if (!shell.includes("bash")) {
    user = process.env.npm_config_username;
    console.log(`Welcome to the File Manager, ${user ? user : "Guest"}`);
  } else {
    //There is a known isuue with NodeJS versions higher than 20.
    //This variant will work in all shells if to add another argument delimiter(--) like this:
    //   npm run start -- -- --username=your_username
    //Without additional delimiter it works fine just in GitBash

    const userNameArg = process.argv.filter((arg) =>
      arg.startsWith("--username=")
    );

    if (userNameArg.length !== 0) {
      user = userNameArg[0].split("=").pop();
    }

    console.log(`Welcome to the File Manager, ${user ? user : "Guest"}`);
  }

  getCurrentDir();

  try {
    while (true) {
      const input = await getUserInput();
      handleUserCommand(input);
    }
  } catch (err) {
    throw new Error(errorMessage);
  }
};

runApp();
