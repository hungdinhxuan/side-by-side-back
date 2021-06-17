const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const WalletSchema = new Schema({
    renterId : {type: Schema.Types.ObjectId, required: true, ref:'renters', unique: true},
    balance : {type: Number, default: 0},
    
}, {timestamps: true})

WalletSchema.plugin(mongoose_delete)
module.exports = mongoose.model('wallets', WalletSchema)