const mongoose = require('mongoose')
const Schema = mongoose.Schema


const HistorySchema = new Schema({
    walletId: {type: String, required: true},
    ammount: {type: Number, required: true, default: 0},
    time: {type: Date, required: true},
    methods: {type: String}
    
})


module.exports = mongoose.model('histories', HistorySchema)