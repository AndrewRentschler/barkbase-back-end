import mongoose from 'mongoose'

const Schema = mongoose.Schema

const accountSchema = new Schema({
  admin: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  dogOwner: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
},{
  timestamps: true,
})

const Account = mongoose.model('Account', accountSchema)

export { Account }