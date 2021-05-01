const {publicKey} = require('./keys')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    jwt.verify(req.cookies.token, publicKey , function(err, decoded) {
        if (err) {
          res.json(err)
        }
        else
        {
            console.log(decoded)
            next()
        }
      })
}