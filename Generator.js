const NodeRSA = require('node-rsa');
const fs = require("fs");

function generatePair() {
    var key = new NodeRSA().generateKeyPair();

    var publicKey = key.exportKey("public");
    var privateKey = key.exportKey("private");

    fs.openSync("./keys/public.pem", 'w');
    fs.writeFileSync("./keys/public.pem", publicKey, "utf-8");

    fs.openSync("./keys/private.pem", 'w');
    fs.writeFileSync("./keys/private.pem", privateKey, "utf-8");
}

generatePair();