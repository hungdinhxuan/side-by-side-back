const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const PlayerSchema = new Schema({
    avatar: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    city: {type: String},
    nation: {type: String},
    price: {type: Number},
    renterId: {type: Schema.Types.ObjectId, ref: 'renters'}

}, {timestamps: true})

PlayerSchema.plugin(mongoose_delete)
module.exports = mongoose.model('players', PlayerSchema)