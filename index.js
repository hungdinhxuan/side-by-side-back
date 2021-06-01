const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const routes = require('./routes/index.js')
const localAuthentication = require('./authentication/local')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')

const { atlasDB, localDB } = require('./config')
app.use(cors())
app.use(passport.initialize())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

const connectDB = async () => {
  try {
    await mongoose.connect(atlasDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log('Connect to database successfully')
  } catch (error) {
    console.log('Cannot connect to database')
  }
}
connectDB()

localAuthentication(app)

routes(app)

app.listen(PORT)
