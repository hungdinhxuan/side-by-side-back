const rentersRouter = require('./renters')
const followsRouter = require('./follows')
const authRouter = require('./auth')
const playersRouter = require('./players')
const citiesRouter = require('./cities')


module.exports = (app) => {
    app.use('/api/renter', rentersRouter)
    app.use('/api/follow', followsRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/player', playersRouter)
    app.use('/api/city', citiesRouter)
}