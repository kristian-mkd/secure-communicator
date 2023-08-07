import { readFromFile, appendToFile, getInboxFile } from "./fileService.js";
import { decryptMessage, encryptMessage } from "./cryptoService.js";

/**
 * Encrypts and sends the messages to the inbox of their receiver.
 *
 * @param {*} message the message to be sent
 * @param {*} receiver the receiver of the message
 */
export const sendMessage = async (message, receiver) => {
  let encryptedMessage = encryptMessage(message, receiver);

  const isCommandMessage = message === "." || message.toLowerCase() === "x";
  if (!isCommandMessage) {
    appendToFile(getInboxFile(receiver), encryptedMessage);
  }
};

export const printMessage = (name, message) => {
  console.log(`${name}: `, message?.join("\n\t"));
};

/**
 * Indicates how many lines are already read from the inbox file.
 */
let readFileMarker = 0;

/**
 * Reads the messages from the given inbox file and decrypts them.
 *
 * @param {*} fileName the filename of the inbox file
 * @returns decrypted received messages
 */
export const processReceivedMessages = async (fileName) => {
  let fileData = readFromFile(fileName);
  let textLines = fileData.split(/\r?\n/);

  if (readFileMarker > textLines?.length) {
    return [];
  }

  let readMessages = [];
  for (let i = readFileMarker; i < textLines?.length; i++) {
    const currentLine = textLines[i];
    if (currentLine !== "") {
      const decrypted = decryptMessage(currentLine);
      readMessages.push(decrypted);
      readFileMarker++;
    }
  }

  return readMessages;
};
