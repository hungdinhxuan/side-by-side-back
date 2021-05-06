const path = require('path')
const fs = require("fs")
const privateKey = fs.readFileSync(path.join(__dirname,  '/keys/key.pem'))
const publicKey = fs.readFileSync(path.join(__dirname,  '/keys/public.pem'))
const frontendHost = 'https://side-by-side-front.vercel.app'
const atlasDB =
  "mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const localDB = "mongodb://localhost:27017/SideBySideDB";


module.exports = {
    privateKey, publicKey, frontendHost, atlasDB, localDB
}