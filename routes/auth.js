const express = require("express");
const router = express.Router();
const passport = require("passport");
const renters = require("../models/renters");
const jwt = require("jsonwebtoken");
const { privateKey, frontendHost } = require("../config");

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["user_friends"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  function (req, res) {
    // Successful authentication, redirect home.
    renters
      .create({
        username: "facebook_" + req.user.id,
        password: Math.random().toString(),
      })
      .then((renter) => {
        const token = jwt.sign({ id: renter._id }, privateKey, {
          algorithm: "RS256",
        });
        res.send(`${frontendHost}/streamer`, { token });
      })
      .catch((err) => {
        renters
          .findOne({ username: "facebook_" + req.user.id })
          .then((renter) => {
            if (renter) {
              const token = jwt.sign({ id: renter._id }, privateKey, {
                algorithm: "RS256",
              });
              res.send(`${frontendHost}/streamer`, { token });
            }
            else
            {
              res.status(500).send(`${frontendHost}/streamer`, { error:  'Server error'});
            }
          })
          .catch((err2) => {
            res.status(500).send(`${frontendHost}/streamer`, { error:  'Server error'});
          });
      });
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  function (req, res) {
    renters
      .create({
        username: "google_" + req.user.id,
        password: Math.random().toString(),
      })
      .then((renter) => {
        res.json({ sucess: `Craeted ${renter}` });
      })
      .catch((err) => {
        res.json({ error: "User existed" });
      });
  }
);

module.exports = router;
