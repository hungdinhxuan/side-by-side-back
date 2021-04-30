const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const RenterSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    privateQuestions: {type: String},
    privateAnswer: {type: String},

})

RenterSchema.pre('save', async function(next){
    try {
        // Generate a salt (random string)
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(this.password, salt)
        this.password = passwordHashed
        console.log(passwordHashed)
    }catch(err)
    {
        next(err)
    }
})

module.exports = mongoose.model('renters', RenterSchema)