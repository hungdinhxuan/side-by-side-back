const {publicKey} = require('./config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    jwt.verify(req.headers.Authorization, publicKey , function(err, decoded) {
        if (err) {
          res.status(403).json({error: 'Token is invalid'})
        }
        else
        {
            console.log(decoded)
            next()
        }
      })
}