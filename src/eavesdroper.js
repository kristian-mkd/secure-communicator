import { getInboxFile, readFromFile } from "./services/fileService.js";

/**
 * How many lines are already read from the file.
 */
let readFileMarkerForAlice = 0;
let readFileMarkerForBob = 0;

const getFileMarker = (name) => {
  if (name === "Alice") {
    return readFileMarkerForAlice;
  }
  if (name === "Bob") {
    return readFileMarkerForBob;
  }
  return 0;
};

const setFileMarker = (name, readFileMarker) => {
  if (name === "Alice") {
    readFileMarkerForAlice = readFileMarker;
  }
  if (name === "Bob") {
    readFileMarkerForBob = readFileMarker;
  }
};

export const eavesdropMessagesFrom = async (name) => {
  let fileData = readFromFile(getInboxFile(name));
  let textLines = fileData.split(/\r?\n/);
  let readFileMarker = getFileMarker(name);

  if (readFileMarker > textLines?.length) {
    return [];
  }

  let readMessages = [];
  for (let i = readFileMarker; i < textLines?.length; i++) {
    if (textLines[i] !== "") {
      readMessages.push(textLines[i]);
      readFileMarker++;
    }
  }

  setFileMarker(name, readFileMarker);
  return readMessages;
};

const printMessagesFor = async (name) => {
  const received = await eavesdropMessagesFrom(name);
  const hasMessages = received?.length !== 0 && received[0] !== "";
  if (hasMessages) {
    console.log(`Message for ${name}: `, received?.join("\n\t"));
    console.log("\n");
  }
};

console.log("staring eavesdrop:" + "\n");

while (true) {
  await printMessagesFor("Alice");
  await printMessagesFor("Bob");
}
