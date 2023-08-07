#!/usr/bin/env node
import {
  processReceivedMessages,
  sendMessage,
  printMessage,
} from "./services/chatService.js";
import {
  shouldTerminateApp,
  shouldTryReadMessages,
  chooseSenderName,
  chooseReceiverName,
  introMessage,
  readMessageFromInput,
} from "./services/cliService.js";
import { generateKeysFor } from "./services/cryptoService.js";
import { clearInboxFiles, getInboxFile } from "./services/fileService.js";

// Setup
await introMessage();
let senderName = await chooseSenderName();
let receiverName = await chooseReceiverName(senderName);
let senderInbox = getInboxFile(senderName);
generateKeysFor(senderName);

console.clear();
clearInboxFiles(senderName, receiverName);

while (true) {
  let message = await readMessageFromInput(senderName);
  await sendMessage(message, receiverName);

  if (shouldTerminateApp(message)) {
    break;
  }

  if (shouldTryReadMessages(message)) {
    const received = await processReceivedMessages(senderInbox);
    const hasMessages = received?.length !== 0 && received[0] !== "";
    if (hasMessages) {
      printMessage(receiverName, received);
    }
  }
}
