const path = require("path");
const fs = require("fs");
const privateKey = fs.readFileSync(path.join(__dirname, "/keys/privateKey.pem"));
const publicKey = fs.readFileSync(path.join(__dirname, "/keys/publicKey.pem"));
require("dotenv").config();

const frontendHost = "http://localhost:3000";
const atlasDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rrcyu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const localDB = "mongodb://localhost:27017/SideBySideDB";

module.exports = {
  privateKey,
  publicKey,
  frontendHost,
  atlasDB,
  localDB,
};
