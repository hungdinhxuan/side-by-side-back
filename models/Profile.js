const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete')

const ProfileSchema = new Schema(
  {
    displayName: { type: String },
    albums: [],
    shortDescribe: { type: String },
    detailDescribe: { type: String },
    linkHightLight: { type: String },
    avatar: { type: String },
    linkSocial: { type: String },
    availableDevices: { type: String },
    playerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'players',
      unique: true,
    },
  },
  { timestamps: true }
)

ProfileSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
  deletedAt: true,
})
module.exports = mongoose.model('profiles', ProfileSchema)
