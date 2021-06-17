const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const HistorySchema = new Schema({
    walletId: {type: Schema.Types.ObjectId, required: true, ref:'wallets'},
    paymentId: {type: Schema.Types.ObjectId, required: true, ref:'payments'},
    ammount: {type: Number, required: true, default: 0},
    
}, {timestamps: true})

HistorySchema.plugin(mongoose_delete)

module.exports = mongoose.model('histories', HistorySchema)