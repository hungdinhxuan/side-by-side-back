const {publicKey} = require('../config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.headers)
    jwt.verify(req.headers.authorization, publicKey , function(err, decoded) {
        if (err) {
          return res.status(403).json({success: false, message:'Token is not valid'})
        }
        else
        {
            req.user = decoded.renterId
            next()
        }
      })
}