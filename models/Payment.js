const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    cardNumber: {type: String, required: true},
    releaseDate: {type: String, required: true},
    walletId: {type: Schema.Types.ObjectId, ref:'wallets', default: ''},
}, {timestamps: true})

PaymentSchema.plugin(mongoose_delete)
module.exports = mongoose.model('payments', PaymentSchema)