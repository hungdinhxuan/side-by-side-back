const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const RoleSchema = new Schema({
    level: {type: Number, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    permission: [],
    description: {type: String}
}, {timestamps: true})

RoleSchema.plugin(mongoose_delete)

module.exports = mongoose.model('roles', RoleSchema)