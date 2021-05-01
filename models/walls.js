const mongoose = require('mongoose')
const Schema = mongoose.Schema


const WallSchema = new Schema({
    displayName: {type: String},
    describe: {type: String},
    linkHightLight: {type: String},
    joinedAt: {type: Date},
    avatar: {type: String},
})


module.exports = mongoose.model('walls', WallSchema)