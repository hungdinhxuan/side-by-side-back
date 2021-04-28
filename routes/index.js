const renters = require('./renters')

module.exports = (app) => {
    app.use('/api/renter', renters)    
}