const Renter = require("../models/Renter");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)
const {privateKey} = require('../config')
const sendMail = require('./sendMail')

require("dotenv").config();


exports.googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  console.log(req.body);
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });
    const { email_verified, name, email, picture } = response.payload;
    console.log(response.payload)
    if (email_verified) {
      let renter = await Renter.findOne({ email });
      if(!renter){
        let newRenter = await Renter.create({username: `google_${email}`, password: `${Math.random()}`, email, name})
      }
      const token = jwt.sign({ email }, privateKey, {
        algorithm: "RS256",
      });
      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    }
    return res
      .status(403)
      .json({ success: true, message: "Email is not verified" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error", error: error });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, name, gender } = req.body;
  console.log(req.body);
  try {
    let renter = await Renter.findOne({ username });
    if (renter) {
      return res.status(406).json({
        success: false,
        message: "Username is already existed",
      });
    }
    renter = await Renter.findOne({ email });
    console.log(renter);
    if (renter) {
      return res.status(406).json({ success: false, message: "Email is already existed" });
    }
    let newRenter = await Renter.create({ username, email, password, name, gender });
    return res
      .status(201)
      .json({ success: true, message: "Sign up successful !"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACTIVATE, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Token is not valid or expired" });
      }
      const { email } = decoded;
      try {
        const renter = await Renter.findOne({ email });
        if (renter) {
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Token is not provide" });
  }
};


exports.forgotPassword = async (req, res) => {
  /* 
    This function will send for user a email with link to reset their password
  */
  const {email} = req.body
  try {
    const subject = "Reset your password"
    const newPassword = Math.floor(Math.random() * 1000000) + 100000
    const token = jwt.sign({email}, privateKey, { algorithm: "RS256"})
    const htmlContent = `<h3> Your new password is ${newPassword}</h3>
                        <a src="http://localhost:3000/auth/reset-password?token=${token}&password=${newPassword}"}>Click me to accept this change</a>
                          `
    const response  = await sendMail(email, subject, htmlContent)
  } catch (error) {
    return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
  }
}


exports.resetPassword = async (req, res) => {
  const {token, password} = req.query
}