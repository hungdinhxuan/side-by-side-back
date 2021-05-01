const mongoose = require('mongoose')
const Schema = mongoose.Schema


const WalletSchema = new Schema({
    renterId : {type: String, required: true},
    balance : {type: Number, default: 0},
    
})


module.exports = mongoose.model('wallets', WalletSchema)