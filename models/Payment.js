const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const PaymentSchema = new Schema({
    name: {type: String},
    cardNumber: {type: String},
    releaseDate: {type: String},
    walletId: {type: String},
}, {timestamps: true})

PaymentSchema.plugin(mongoose_delete)
module.exports = mongoose.model('payments', PaymentSchema)