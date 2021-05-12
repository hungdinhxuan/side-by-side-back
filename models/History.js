const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const HistorySchema = new Schema({
    walletId: {type: String, required: true},
    ammount: {type: Number, required: true, default: 0},
    time: {type: Date, required: true},
    methods: {type: String}
    
}, {timestamps: true})

HistorySchema.plugin(mongoose_delete)

module.exports = mongoose.model('histories', HistorySchema)