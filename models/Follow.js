const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const FollowSchema = new Schema({
    renterID: {type: Schema.Types.ObjectId,  ref: 'renters'},
    playerID: {type: Schema.Types.ObjectId, ref:'players'},
   
}, {timestamps: true})


FollowSchema.plugin(mongoose_delete)
module.exports = mongoose.model('follows', FollowSchema)