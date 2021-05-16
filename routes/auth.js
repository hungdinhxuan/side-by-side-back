const express = require("express");
const router = express.Router();
const passport = require("passport");
const Renter = require("../models/Renter");
const jwt = require("jsonwebtoken");
const { privateKey, frontendHost } = require("../config");
const url = require("url");
const verify = require("../middleware/verify");
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)

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

router.post('/google', async (req, res) => {
  const {tokenId} = req.body
  console.log(req.body)
  try {
    const response = await client.verifyIdToken({idToken: tokenId, audience: `${process.env.GOOGLE_CLIENT_ID}`})    
    const {email_verified, name, email, picture} = response.payload
    if(email_verified){
        const token = jwt.sign({email}, privateKey, {
          algorithm: "RS256"})
        return res.json({success: true, message: 'Login successful', token: token})
    }
    console.log(response.payload)
    return res.status(403).json({success: true, message: 'Email is not verified'})
} catch (error) {
    console.log(error)
    return res.status(500).json({success: true, message: 'Internal Server Error', error: error})
}
})

module.exports = router;
