const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const NotificationSchema = new Schema({
    content: {type: String, required: true, default: ''},
    renterId: { type: Schema.Types.ObjectId, required: true, ref:'renters'},
    isRead: {type: Boolean, required: true, default: false},
}, {timestamps: true})

HistorySchema.plugin(mongoose_delete)

module.exports = mongoose.model('notifications', NotificationSchema)