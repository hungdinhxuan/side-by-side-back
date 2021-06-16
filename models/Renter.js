const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')
const { getListCity } = require('../config')

const RenterSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, maxLength: 255 },
    email: { type: String, unique: true, required: true, maxLength: 255 },
    password: { type: String, required: true, maxLength: 255 },
    name: { type: String, required: true, maxLength: 64 },
    gender: {
      type: String,
      default: 'Khác',
      enum: { values: ['Name', 'Nữ', 'Khác'] },
    },
    city: {
      type: String,
      default: 'Hồ Chí Minh',
      enum: { values: getListCity },
    },
    nation: {
      type: String,
      default: 'Việt Nam',
      enum: { values: ['Việt Nam'] },
    },
    birthDate: { type: Date, default: '2000-01-01' },
    nickName: { type: String, default: '' },
    avatar: { type: String, default: 'default-avatar.png' },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
)

RenterSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
  deletedAt: true,
})

module.exports = mongoose.model('renters', RenterSchema)
