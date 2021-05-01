const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const authentication = require("./authentication");
const atlasDB =
  "mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const localDB = "mongodb://localhost:27017/SideBySideDB";
const cookieParser = require("cookie-parser");
const passport = require("passport");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// atlas: mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//
const connectDB = async () => {
  await mongoose.connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connect to database successfully");
};

connectDB();
authentication(app);
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["user_friends"],
  })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/", (req, res) => {
  res.json("Hello world");
});

routes(app);

app.listen(PORT);
