module.exports = (app) => {
  const passport = require('passport')
  const argon2 = require('argon2')
  const LocalStrategy = require('passport-local').Strategy
  const Renter = require('../models/Renter')

  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const renter = await Renter.findOne({ username: username })
        if (!renter) {
          return done(null, false)
        }
        if (!argon2.verify(renter.password, password)) {
          return done(null, false)
        }
        return done(null, renter)
      } catch (error) {
        return done(err)
      }
    })
  )
}
