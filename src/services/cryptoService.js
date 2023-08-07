import fs from "fs";
import crypto from "crypto";

/**
 * The private key of the sender is stored in memory of the application,
 * making it not easily accessible to the eavesdropper.
 */
let senderPrivateKey;

export const generateKeysFor = (sender) => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });

  const publicKeyFilePath = getPublicKeyFilePath(sender);
  fs.writeFileSync(publicKeyFilePath, keyPair.publicKey);
  senderPrivateKey = keyPair.privateKey;
};

export const encryptMessage = (plaintext, receiver) => {
  const publicKeyFilePath = getPublicKeyFilePath(receiver);
  const publicKey = fs.readFileSync(publicKeyFilePath, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plaintext));
  return encrypted.toString("base64");
};

export const decryptMessage = (cipherText) => {
  const decrypted = crypto.privateDecrypt(
    {
      key: senderPrivateKey,
      passphrase: "",
    },
    Buffer.from(cipherText, "base64")
  );

  return decrypted.toString("utf8");
};

const getPublicKeyFilePath = (name) => {
  return `./files/keys/${name}_public_key`;
};
