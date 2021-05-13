const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const localAuthentication = require("./authentication/local");
const facebookAuthentication = require("./authentication/facebook");
const googleAuthentication = require("./authentication/google");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const cors = require('cors')
const {atlasDB, localDB} = require('./config')

app.use(cors())


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
localAuthentication(app);
facebookAuthentication(app);
googleAuthentication(app);

app.get("/", (req, res) => {
  res.json(req.user);
});

app.get("/home", (req, res) => {
  res.json(req.user);
});


routes(app);



app.listen(PORT);
