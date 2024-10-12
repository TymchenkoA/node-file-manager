import { homedir } from "node:os";
import { getUserInput, closeInterface } from "./controller.js";
import commands from "./commands/index.js";
import { getCurrentDir } from "./utils/getCurrentDir.js";

let user = "";

process.chdir(homedir());

const handleUserCommand = (input) => {
  const [command, ...args] = input.split(" ");
  // console.log(command);
  // console.log(args);

  switch (command) {
    case "up":
      commands.goUp();
      break;
    case "cd":
      commands.changeDir(args[0]);
      break;
    case "ls":
      commands.getFilesList();
      break;
    case "cat":
      commands.read(args[0]);
      break;
    case "add":
      commands.create(args[0]);
      break;
    // case "rn":
    //   commands.rename(args[0], args[1]);
    //   break;
    case ".exit":
      console.log(
        `Thank you for using File Manager, ${user ? user : "Guest"}, goodbye!`
      );
      closeInterface();
      process.exit(0);
      break;
    default:
      console.log("Invalid input");
  }
};

const setupSIGINTHandler = () => {
  process.stdin.on("data", (data) => {
    //Checking if user presses Ctrl+C
    if (data.toString() === "\u0003") {
      console.log(
        `Thank you for using File Manager, ${user ? user : "Guest"}, goodbye!`
      );
      closeInterface();
      process.exit(0);
    }
  });
};

const runApp = async () => {
  const shell = process.env.SHELL || process.env.ComSpec || "unknown shell";

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

  setupSIGINTHandler();

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
