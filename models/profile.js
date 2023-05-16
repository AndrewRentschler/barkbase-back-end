import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  isAdmin: { type: Boolean, default: false },
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
