const express = require('express');
const router = express.Router();
const Renter = require('../models/Renter');
const verify = require('../middleware/verify');
const {register, googleLogin, forgotPassword, resetPassword} = require('../controllers/auth')
require('dotenv').config();


const sendMail = require('../controllers/sendMail')

const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env;

// @route /api/auth
// @ method: POST
// @ access: public
router.post('/register', register)

// @route /api/auth
// @ method: POST
// @ access: private
router.get('/', verify, async (req, res) => {
  try {
    const renter = await Renter.findById(req.userId).select('-password');
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
router.post('/google', googleLogin)



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

// @route /api/auth/forgot-password
// @ method: POST
// @ access: public
router.post('/forgot-password', forgotPassword)

// @route /api/auth/reset-password
// @ method: GET
// @ access: public
router.get('/reset-password', resetPassword)


router.get('/search', async (req, res) => {
  const {email} = req.query
  try {
    const renter = await Renter.findOne({email: email})
    return res.json({success: true, message: 'OK', renter})
  } catch (error) {
    return res.status(500).json({success: false, message: 'Internal Server Error'})
  }
})

module.exports = router;
