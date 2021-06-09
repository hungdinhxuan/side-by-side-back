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
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
const {publicKey} = require('./config')
const jwt = require('jsonwebtoken')
const socket = require('./socket')
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
app.use('/public', express.static(path.join(__dirname, 'public')))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
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

server.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT)
})

socket(io)
