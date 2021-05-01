const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FollowSchema = new Schema({
    renterID: {type: String, required: true},
    playerID: {type: String, required: true},
   
})


module.exports = mongoose.model('follows', FollowSchema)