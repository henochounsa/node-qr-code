const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3001;
const server_address  = 'http://127.0.0.1' // Remplacer cette adresse avec l'adresse de la machine en ligne
// Charger le clé publique pour vérifier la signature du JWT
const publicKey = fs.readFileSync('public_key.pem', 'utf8');

app.use(express.json());

app.get('/verifyQRCode', (req, res) => {
  const token = req.query.token;
  // Vérifier la signature du token JWT avec la clé publique
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decodedData) => {
    if (err) {
      console.error('Erreur lors de la vérification du JWT:', err);
      res.status(401).send('Échec de l\'authentification');
    } else {
      console.log("decodedData", decodedData)
      const document = decodedData?.document;
      const signature = decodedData?.signature;
      // Vérifier la signature du document 
      // Verifier que l'identifiant document  existe en base de donnée sinon le document n'est pas valide
      // ...

      // Si toutes les vérifications sont concluantes
      res.json({ message: "Le document est authentique" });
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur écoutant a l'adresse ${server_address}:${port}/verifyQRCode`);
});