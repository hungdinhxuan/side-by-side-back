const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const MessegeSchema = new Schema({
    senderId: {type: String, required : true},
    receiverId: {type: String, required : true},
    content: { type: String, required : true},
    isReceiverRead: {type: Boolean}
}, {timestamps: true})

MessegeSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
  })

module.exports = mongoose.model('histories', MessegeSchema)