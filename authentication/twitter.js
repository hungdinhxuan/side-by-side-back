module.exports = (app) => {
  var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: 'TWITTER_CONSUMER_KEY',
        consumerSecret: 'TWITTER_CONSUMER_SECRET',
        callbackURL: 'http://www.example.com/auth/twitter/callback',
      },
      function (token, tokenSecret, profile, done) {
        done(null, profile)
      }
    )
  )
}
