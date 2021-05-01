module.exports = (app) => {
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  const FacebookStrategy = require("passport-facebook").Strategy;
  const renters = require("./models/renters");
  const bcrypt = require("bcryptjs");

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(err, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: "1707966096067858",
        clientSecret: "8f67fb5c398f86a6b3b40b2d8825ab56",
        callbackURL: "https://side-by-side-back.vercel.app/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },

      function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log(profile);
        return cb(null, profile);
      }
    )
  );

  passport.use(
    new LocalStrategy(function (username, password, done) {
      renters.findOne({ username: username }, function (err, renter) {
        if (err) {
          return done(err);
        }
        if (!renter) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, renter.password)) {
          return done(null, false);
        }
        return done(null, renter);
      });
    })
  );
};
