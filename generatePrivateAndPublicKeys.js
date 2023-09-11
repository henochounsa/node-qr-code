const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");

const keyBits = 2048; // Longueur de la clé en bits | j'ai mis le minimum pour un RS256

// Créez une interface de ligne de commande pour demander le mot de passe pour décrypter la clé privé

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Entrez le mot de passe pour chiffrer la clé privée : ",
  (passphrase) => {
    // Fermez l'interface de ligne de commande
    rl.close();

    // Générer une paire de clés RSA
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: keyBits,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc", // Algorithme de chiffrement pour la clé privée
        passphrase: passphrase, // Mot de passe pour chiffrer la clé privée
      },
    });

    // Enregistrez la clé privée chiffrée dans un fichier (sauvegarde sécurisée nécessaire)
    fs.writeFileSync("private_key_encrypted.pem", privateKey);
    fs.writeFileSync("public_key.pem", publicKey);

    console.log("Clés chiffrées générées et enregistrées avec succès.");
  }
);