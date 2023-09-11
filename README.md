===================================

ORDRE D'EXECUTION DES SCRIPTS

===================================

STEP 1: 

Exécuter: node generatePrivateAndPublicKeys.js
Fournir le mot de passe sécurisé a utiliser a chaque utilisation de la Clé Privé pour encrypter des documents


STEP 2: 

Exécuter: node verifyQrCode.js
Récupérer l'adresse du serveur et le placer dans le fichier .env, le serveur est alors prêt a recevoir une requête.


STEP 3: 

Exécuter: node generateQrCode.js
Fournir le mot de passe sécurisé a utiliser pour débloquer la clé privé afin de l'utiliser pour signer le document


STEP 4: 

Exécuter: node readTheQrCode.js
Pour lire le Qr code ou scanner le Qr code avec un lecteur de Qr code 
