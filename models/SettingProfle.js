const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const SettingProfileSchema = new Schema({
    requireDuo: {type: Boolean, default: true},
    price: {type: Number, default:10000},
    timeframes: {type: String},
    profileId: {type: Schema.Types.ObjectId, required: true, ref:'profiles'}
}, {timestamps: true})


SettingProfileSchema.plugin(mongoose_delete)
module.exports = mongoose.model('profiles', SettingProfileSchema)