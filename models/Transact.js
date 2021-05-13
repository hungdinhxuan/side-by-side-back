const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const TransactSchema = new Schema({
    renterID: {type: Schema.Types.ObjectId, required: true, ref='renters'},
    playerID: {type: Schema.Types.ObjectId, required: true, ref='players'},
    amount: {type: Number},
    rentedHours: {type: Number},
    status: {type: String},
    time: {type: Date},

}, {timestamps: true})

TransactSchema.plugin(mongoose_delete)

module.exports = mongoose.model('transacts', TransactSchema)