const express = require("express");
const router = express.Router();
const passport = require("passport");
const renters = require("../models/renters");

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
        res.json(`Craeted ${renter}`);
      })
      .catch((err) => {});
    res.redirect("/");
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
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    renters
      .create({
        username: "google_" + req.user.id,
        password: Math.random().toString(),
      })
      .then((renter) => {
        res.json(`Craeted ${renter}`);
      })
      .catch((err) => {});
    res.redirect("/");
  }
);

module.exports = router;
