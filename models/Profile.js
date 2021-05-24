const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const ProfileSchema = new Schema({
    displayName: {type: String},
    describe: {type: String},
    linkHightLight: {type: String},
    avatar: {type: String},
    playerId: {type: Schema.Types.ObjectId, required: true, ref:'players'}
}, {timestamps: true})


ProfileSchema.plugin(mongoose_delete)
module.exports = mongoose.model('profiles', ProfileSchema)