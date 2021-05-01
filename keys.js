const path = require('path')
const fs = require("fs")
const privateKey = fs.readFileSync(path.join(__dirname,  '/keys/key.pem'))
const publicKey = fs.readFileSync(path.join(__dirname,  '/keys/public.pem'))

module.exports = {
    privateKey, publicKey
}