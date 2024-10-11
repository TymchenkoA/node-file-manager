import { getUserInput } from "./controller.js";

const handleUserCommand = (input) => {
  const [command, ...args] = input.split(" ");
  console.log(command);
  console.log(args);

  const userNameArg = process.argv.filter((arg) =>
    arg.startsWith("--username=")
  );

  console.log(userNameArg);

  switch (command) {
    case "create":
      console.log("create");
      break;
    case "delete":
      console.log("delete");
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
