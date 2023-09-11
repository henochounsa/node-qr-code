const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const qrcode = require("qrcode");
const fs = require("fs");
const readline = require("readline");
const forge = require("node-forge");

require('dotenv').config();

// Lisez la clé privée chiffrée (à garder secrète)
const privateKeyEncrypted = fs.readFileSync(
  "private_key_encrypted.pem",
  "utf8"
);

const serverVerificationUrl = process.env.AUTH_SERVER_URL; // Remplacez par l'URL du serveur d'authentification

// Créez une interface de ligne de commande pour demander le mot de passe
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Entrez le mot de passe pour dechiffrer la clé privée : ",
  (passphrase) => {
    rl.close();
    const confidentialDocument = "NPI2k23EXX";
    // Ici c'est un exemple d'identifiant du titulaire du document
    let privateKey;
    try {
      const privateKeyObject = forge.pki.decryptRsaPrivateKey(
        privateKeyEncrypted,
        passphrase
      );
      privateKey = forge.pki.privateKeyToPem(privateKeyObject);
    } catch (err) {
      console.error("Error reading or unlocking the private key:", err);
    }

    console.log("Clé privée déverrouillée avec succès:", privateKey);
    // Utilisez privateKey pour des opérations de signature, de déchiffrement, etc.
    // Signer le contenu du document
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(confidentialDocument);
    const signature = sign.sign(privateKey, "base64");
    // Enregistrer la signature en base pour vérifier l'ors de l'authentification du document
    // Créer un objet JSON contenant le contenu du document et la signature
 
    const secureData = {
      document: confidentialDocument,
      signature: signature,
    };

    // Générer un token JWT signé avec la clé privée
    const token = jwt.sign(secureData, privateKey, { algorithm: "RS256" });
    const qrCodeVersion = 25; // Remplacer avec la version de QR code voulu (1 a 40)
    // Générer un QR code à partir du token JWT
    qrcode.toFile(
      "qrcode.png",
      `${serverVerificationUrl}?token=${token}`,
      { version: qrCodeVersion },
      (err) => {
        if (err) {
          console.error("Erreur lors de la génération du QR code:", err);
        } else {
          console.log(
            "QR code généré avec succès et stocké dans le dossier courant."
          );
        }
      }
    );
  }
);