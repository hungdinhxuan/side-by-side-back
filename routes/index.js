const renters = require('./renters')
const follows = require('./follows')
const auth = require('./auth')
const players = require('./players')


module.exports = (app) => {
    
    app.use('/api/renter', renters)
    app.use('/api/follow', follows)
    app.use('/auth', auth)
    app.use('/api/player', players)
}