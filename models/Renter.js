const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const mongoose_delete = require('mongoose-delete');

const RenterSchema = new Schema({
    username: {type: String, unique: true, required: true, maxLength: 255},
    email: {type: String, unique: true, required: true, maxLength: 255},
    password: {type: String, required: true, maxLength: 255},
    name: {type: String, required: true, maxLength: 64},
    gender: {type: String},
    resetLink: {type: String, default: ''},
    isActive: {type: Boolean, default: false},

}, {timestamps: true})

RenterSchema.plugin(mongoose_delete)

RenterSchema.pre('save', async function(next){
    try {
        // Generate a salt (random string)
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(this.password, salt)
        this.password = passwordHashed
        
    }catch(err)
    {
        next(err)
    }
})


module.exports = mongoose.model('renters', RenterSchema)