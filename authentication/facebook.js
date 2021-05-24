module.exports = (app) => {
  
  const passport = require('passport');
  const FacebookStrategy = require('passport-facebook').Strategy;
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: '1707966096067858',
        clientSecret: '8f67fb5c398f86a6b3b40b2d8825ab56',
        callbackURL: 'https://side-by-side-back.vercel.app/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },

      function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        
        return cb(null, profile);
      }
    )
  );
};
