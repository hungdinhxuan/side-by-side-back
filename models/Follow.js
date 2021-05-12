const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const FollowSchema = new Schema({
    renterID: {type: String, required: true},
    playerID: {type: String, required: true},
   
}, {timestamps: true})

FollowSchema.plugin(mongoose_delete)
module.exports = mongoose.model('follows', FollowSchema)