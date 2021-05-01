const renters = require('./renters')
const follows = require('./follows')

module.exports = (app) => {
    app.use('/api/renter', renters)
    app.use('/api/follow', follows)
}