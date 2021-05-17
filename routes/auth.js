const express = require("express");
const router = express.Router();
const Renter = require("../models/Renter");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../config");
const verify = require("../middleware/verify");
const {OAuth2Client} = require('google-auth-library');
const {register} = require('../controllers/auth')
require("dotenv").config();

const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)
const sendMail = require('../controllers/sendMail')

const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env;

// @route /api/auth
// @ method: POST
// @ access: public
router.post('/register', register)

// @route /api/auth
// @ method: POST
// @ access: private
router.get("/", verify, async (req, res) => {
  try {
    const renter = await Renter.findById(req.userId).select("-password");
    return res.json({ success: true, renter });
  } catch (error) {
    return res.json({success: false, message: 'Internal Server Error'})
  } 
});


// @route /api/auth/facebook
// @ method: POST
// @ access: public
router.post('/facebook', async (req, res) => {
  const {tokenId} = req.body
  console.log(req.body)
  
})


// @route /api/auth/google
// @ method: POST
// @ access: public
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



// @route /api/auth/sendmail
// @ method: POST
// @ access: public

router.post('/sendmail', async (req, res) => {
  const {to, subject} = req.body
  console.log(ADMIN_EMAIL)
  const htmlContent = `<h1>Email sent from admin to ${to} </h1>`
  try {
    const response = await sendMail(to, subject, htmlContent)  
    return res.status(200).json({success: true, message: 'Email sent successfully', response: response})
  } catch (error) {
    return res.status(500).json({success: true, message: 'Internal Server Error', error: error})
  }
  
})

module.exports = router;
