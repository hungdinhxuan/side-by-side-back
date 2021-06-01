const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')


const RenterSchema = new Schema({
    username: {type: String, unique: true, required: true, maxLength: 255},
    email: {type: String, unique: true, required: true, maxLength: 255},
    password: {type: String, required: true, maxLength: 255},
    name: {type: String, required: true, maxLength: 64},
    gender: {type: String, default: 'Khác', enum: ['Name', 'Nữ', 'Khác']},
    avatar: {type: String, default:'https://dc577.4shared.com/img/zLirxaRAiq/s25/17997bde090/default-avatar'}

}, {timestamps: true})

RenterSchema.plugin(mongoose_delete)

module.exports = mongoose.model('renters', RenterSchema)