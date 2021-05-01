const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const WallSchema = new Schema({
    displayName: {type: String},
    describe: {type: String},
    linkHightLight: {type: String},
    joinedAt: {type: Date},
    avatar: {type: String},
}, {timestamps: true})


WallSchema.plugin(mongoose_delete)
module.exports = mongoose.model('walls', WallSchema)