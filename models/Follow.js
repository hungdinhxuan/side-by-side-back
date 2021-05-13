const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');

const FollowSchema = new Schema({
    renterID: {type: String, required: true, ref='renters'},
    playerID: {type: String, required: true, ref='players'},
   
}, {timestamps: true})

FollowSchema.plugin(mongoose_delete)
module.exports = mongoose.model('follows', FollowSchema)