const passport = require('passport')
const jwt = require('jsonwebtoken')
const { privateKey } = require('../config')

module.exports = (req, res, next) => {
  console.log(req.body)

  passport.authenticate('local', (err, renter) => {
    if (err) return res.status(500).json({success: false, message: 'Internal Server Error'})
    if (!renter) res.status(401).json({success: false, message: 'Tài khoản hoặc mật khẩu không đúng'})
    else {
      const token = jwt.sign({ id: renter._id }, privateKey, {
        algorithm: 'RS256',
      })
      res.cookie('token', token)
      return res.json({success: true, token: token })
    }
  })(req, res, next)
}
