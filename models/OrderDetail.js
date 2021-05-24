const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const OrderDetailSchema = Schema({
    renterId: {type: Schema.Types.ObjectId, required: true, ref:'renters'},
    playerId: {type: Schema.Types.ObjectId, required: true, ref:'players'},
    amount: {type: Number},
    rentedHours: {type: Number},
    status: {type: String},
}, {timestamps: true})

OrderDetailSchema.plugin(mongoose_delete)

module.exports = mongoose.model('orderdetail', OrderDetailSchema)