import {
  decryptMessage,
  encryptMessage,
  generateKeysFor,
} from "../src/services/cryptoService.js";

describe("Encryption service tests", () => {
  test("Should verify encryption and decryption of a message", async () => {
    // given
    const plainTextMessage = "test message";
    generateKeysFor("Alice");
    generateKeysFor("Bob");

    // when
    const encryptedMessage = encryptMessage(plainTextMessage, "Bob");
    const decryptedMessage = decryptMessage(encryptedMessage);

    // then
    expect(plainTextMessage).toBe(decryptedMessage);
  });
});
