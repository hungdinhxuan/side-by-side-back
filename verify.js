const {publicKey} = require('./config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.headers)
    jwt.verify(req.headers.authorization, publicKey , function(err, decoded) {
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