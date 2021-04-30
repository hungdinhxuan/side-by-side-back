const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const routes = require("./routes/index.js")
const authentication = require('./authentication')
const atlasDB = "mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const localDB = "mongodb://localhost:27017/SideBySideDB"


// authentication(app)
const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  const renters = require("./models/renters");
  const bcrypt = require("bcryptjs");

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
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

app.use(express.urlencoded({ extended: true }))


// atlas: mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// 
const connectDB = async () => {
  await mongoose.connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('Connect to database successfully')
}
connectDB()

routes(app)

app.listen(PORT);
