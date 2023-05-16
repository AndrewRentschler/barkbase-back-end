import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  role: { 
    Number, 
    default: 2 
    // 1 Admin
    // 2 dogOwner
  },
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
