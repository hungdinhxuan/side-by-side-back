const Message = require('../models/Message')

exports.SendMessage = async (sender, receiver, content) => {
    try {
        const message = await Message.create({sender, receiver, content, isReceiverRead: false})
        return message        
    } catch (error) {
        return null
    }
}