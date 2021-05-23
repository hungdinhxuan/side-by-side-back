module.exports = (app) => {
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: '549866172650-o632qga06fhb7bodb723dm4mmnb252g5.apps.googleusercontent.com',
        clientSecret: '6ejLJkexWQwpXcN2N9XMJTyJ',
        callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
          return done(null, profile);
      }
    )
  );
};
