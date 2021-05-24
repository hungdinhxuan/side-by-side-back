const Renter = require('../models/Renter')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)
const { publicKey, privateKey } = require('../config')
const sendMail = require('./sendMail')
const rentersController = require('./renters')

require('dotenv').config()


exports.googleLogin = async (req, res, next) => {
  const { tokenId } = req.body
  console.log(req.body)
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    })
    const { email_verified, name, email, picture } = response.payload
    console.log(response.payload)
    if (email_verified) {
      let renter = await Renter.findOne({ email })
      if (!renter) {
        let newRenter = await Renter.create({
          username: `google_${email}`,
          password: `${Math.random()}`,
          email,
          name,
        })
      }
      const token = jwt.sign({ email }, privateKey, {
        algorithm: 'RS256',
      })
      return res.json({
        success: true,
        message: 'Login successful',
        token,
      })
    }
    return res
      .status(403)
      .json({ success: true, message: 'Email is not verified' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: true, message: 'Internal Server Error', error: error })
  }
}

exports.register = rentersController.post

exports.activateAccount = (req, res) => {
  const { token } = req.body
  if (token) {
    jwt.verify(token, process.env.JWT_ACTIVATE, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: 'Token is not valid or expired' })
      }
      const { email } = decoded
      try {
        const renter = await Renter.findOne({ email })
        if (renter) {
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal server error' })
      }
    })
  } else {
    return res
      .status(403)
      .json({ success: false, message: 'Token is not provide' })
  }
}

exports.forgotPassword = async (req, res) => {
  /* 
    This function will send for user a email with link to reset their password
  */
  const { email } = req.body

  try {
    const renter = await Renter.findOne({ email: email })
    if (!renter) {
      return res.status(400).json({
        success: false,
        message: 'This email has not yet registered!!!',
      })
    }
    const subject = 'Reset your password'
    const newPassword = Math.floor(Math.random() * 1000000) + 100000
    const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256', expiresIn: '1d'})
    const htmlContent = `<h3> Your new password is ${newPassword}</h3>
                        <h4> Click on the link below to reset your password </h4>
                        <p> Click <a href="${process.env.SERVER_HOST}/api/auth/reset-password?token=${token}&password=${newPassword}"> here </a> to reset your password</p>
                        or copy and paste url below to your browser
                        ${process.env.SERVER_HOST}/api/auth/reset-password?token=${token}&password=${newPassword}
                        `
    const response = await sendMail(email, subject, htmlContent)
    return res.json({
      success: true,
      message: 'Sent email to reset password successful',
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

exports.resetPassword = async (req, res) => {
  const { token, password } = req.query
  console.log(req.query)
  const { email } = jwt.verify(token, publicKey)
  console.log(email)
  try {
    const renter = await Renter.findOneAndUpdate({ email }, { password })
    return res.send('<h1> Reset password successful </h1>')
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
}
