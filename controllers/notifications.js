const Notification = require('../models/Notification')

exports.getNotification = async (renterId) => {
    try {
        const notification = await Notification.find({renterId}).lean()
        return notification
    } catch (error) {
        return null
    }
}


exports.createNotification = async (data) => {
    const {renterId, content} = data
    try {
        const notification = await Notification.create({renterId, content})
        return notification
    } catch (error) {
        return null
    }
}


// Sua thong bao hien tai
exports.updateNotification = async (_id) => {
    try {
        const notification = await Notification.findByIdAndUpdate(_id, {isRead: true})
        return notification
    } catch (error) {
        return null
    }
}

exports.delete = async () => {
    
}