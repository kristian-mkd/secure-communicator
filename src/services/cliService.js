import chalk from "chalk";
import inquirer from "inquirer";
import { COMMUNICATORS } from "../utils/index.js";

export const introMessage = async () => {
  console.log(`
    ${chalk.blueBright("🔒SECURE COMMUNICATOR APP🔒")} 
    I can help Bob and Alice exchange secure messages without being eavesdropped by Eve.
    
    🎮 Commands: 
      - To pause sending and start receiving messages end your current message with ${chalk.red(
        `".", "?", or "!"`
      )}
      - Send ${chalk.red("x")} message to terminate the program.
  `);
};

export const chooseSenderName = async () => {
  const input = await inquirer.prompt({
    name: "senderName",
    type: "list",
    message: "What's your name?\n",
    choices: COMMUNICATORS,
  });

  return input?.senderName;
};

export const chooseReceiverName = async (senderName) => {
  const input = await inquirer.prompt({
    name: "receiverName",
    type: "list",
    message: "Choose who do you like to talk to?\n",
    choices: COMMUNICATORS.filter((name) => name !== senderName),
  });

  return input?.receiverName;
};

export const readMessageFromInput = async (sender) => {
  const input = await inquirer.prompt({
    name: `senderMessage`,
    type: "input",
    message: `${sender}: `,
    default() {
      return "Message";
    },
  });

  let message = input?.senderMessage?.trim();
  return message;
};

export const shouldTerminateApp = (message) => {
  return message.toLowerCase() === "x";
};

export const shouldTryReadMessages = (message) => {
  return (
    message.endsWith(".") || message.endsWith("!") || message.endsWith("?")
  );
};
