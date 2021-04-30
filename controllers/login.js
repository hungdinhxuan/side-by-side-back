const renters = require("../models/renters");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {privateKey, publicKey} = require("../keys")

module.exports = (req, res, next) => {
  passport.authenticate("local", (err, renter) => {
    if (err) res.json("Loi server");
    if (!renter) res.json("Username or password is not correct");
    else {
      // const token = jwt.sign({ id: renter._id }, privateKey, {
      //   algorithm: "RS256",
      // });
      // res.json({ token: token });
      res.json(renter)
    }
  })(req, res, next);
};
