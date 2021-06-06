const rentersRouter = require('./renters')
const followsRouter = require('./follows')
const authRouter = require('./auth')
const playersRouter = require('./players')
const profileRouter = require('./profiles')
const citiesRouter = require('./cities')


module.exports = (app) => {
    app.use('/api/renter', rentersRouter)
    app.use('/api/follow', followsRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/player', playersRouter)
    app.use('/api/profile', profileRouter)
    app.use('/api/city', citiesRouter)
}