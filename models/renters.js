const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RenterSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    privateQuestions: {type: String},
    privateAnswer: {type: String},

})

module.exports = mongoose.model('renters', RenterSchema)