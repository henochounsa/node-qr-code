const Jimp = require("jimp");
const fs = require("fs");
const qrCodeReader = require("qrcode-reader");

//Lire l'image et créer un buffer 
const buffer = fs.readFileSync("./qrcode.png");

//Lire l'image en utilisant la méthode Jimp.read()
Jimp.read(buffer, function (err, image) {
  if (err) {
    console.error(err);
  }
  //Créer une  instance du lecteur qrcode-reader
  const qrCodeInstance = new qrCodeReader();

  qrCodeInstance.callback = function (err, value) {
    if (err) {
      console.error(err);
    }
    //Afficher en console le contenu du Qr code
    console.log(value?.result);
  };

  //Lancer le décodage du Qr code
  qrCodeInstance.decode(image.bitmap);
});