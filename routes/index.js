const renters = require('./renters')
const follows = require('./follows')
const auth = require('./auth')


module.exports = (app) => {
    
    app.use('/api/renter', renters)
    app.use('/api/follow', follows)
    app.use('/auth', auth)
}