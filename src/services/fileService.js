import fs from "fs";

export const writeToFile = (fileName, message) => {
  try {
    fs.writeFileSync(fileName, message);
  } catch (err) {
    console.error(err);
  }
};

export const appendToFile = (fileName, message) => {
  try {
    fs.appendFileSync(fileName, message + "\n");
  } catch (err) {
    console.error(err);
  }
};

export const readFromFile = (fileName) => {
  return fs.readFileSync(fileName, "utf8");
};

export const getInboxFile = (name) => {
  return `./files/inbox/${name}.txt`;
};

export const clearInboxFiles = (sender, receiver) => {
  try {
    fs.writeFile(getInboxFile(sender), "", () => {});
    fs.writeFile(getInboxFile(receiver), "", () => {});
  } catch (err) {
    console.error(err);
  }
};
