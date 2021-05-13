const express = require("express");
const router = express.Router();
const passport = require("passport");
const Renter = require("../models/Renter");
const jwt = require("jsonwebtoken");
const { privateKey, frontendHost } = require("../config");
const url = require("url");
const verify = require("../middleware/verify");

router.get("/", verify, async (req, res) => {
  try {
    const renter = await Renter.findById(req.userId).select("-password");
    return res.json({ success: true, renter });
  } catch (error) {
    return res.json({success: false, message: 'Internal Server Error'})
  }
});

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
    Renter.create({
      username: "facebook_" + req.user.id,
      password: Math.random().toString(),
    })
      .then((renter) => {
        console.log("Run then 1");
        const token = jwt.sign({ id: renter._id }, privateKey, {
          algorithm: "RS256",
        });
        res.redirect(
          url.format({
            pathname: frontendHost,
            query: {
              token,
            },
          })
        );
      })
      .catch((err) => {
        Renter.findOne({ username: "facebook_" + req.user.id })
          .then((renter) => {
            if (renter) {
              const token = jwt.sign({ id: renter._id }, privateKey, {
                algorithm: "RS256",
              });
              res.redirect(
                url.format({
                  pathname: frontendHost,
                  query: {
                    token,
                  },
                })
              );
            } else {
              res.redirect(
                url.format({
                  pathname: frontendHost,
                  query: {
                    error: "Server error",
                  },
                })
              );
            }
          })
          .catch((err2) => {
            res.redirect(
              url.format({
                pathname: frontendHost,
                query: {
                  error: "Server error",
                },
              })
            );
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
    Renter.create({
      username: "google_" + req.user.id,
      password: Math.random().toString(),
    })
      .then((renter) => {
        res.redirect(
          url.format({
            pathname: frontendHost,
            query: {
              token,
            },
          })
        );
      })
      .catch((err) => {
        Renter.findOne({ username: "google_" + req.user.id })
          .then((renter) => {
            if (renter) {
              const token = jwt.sign({ id: renter._id }, privateKey, {
                algorithm: "RS256",
              });
              res.redirect(
                url.format({
                  pathname: frontendHost,
                  query: {
                    token,
                  },
                })
              );
            } else {
              res.redirect(
                url.format({
                  pathname: frontendHost,
                  query: {
                    error: "Server error",
                  },
                })
              );
            }
          })
          .catch((err2) => {
            res.redirect(
              url.format({
                pathname: frontendHost,
                query: {
                  error: "Server error",
                },
              })
            );
          });
      });
  }
);

module.exports = router;
