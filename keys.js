const fs = require("fs");
const privateKey = fs.readFileSync("./keys/key.pem");
const publicKey = fs.readFileSync("./keys/public.pem");

module.exports = {
    privateKey,
    publicKey
}