import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
    size: {
      type: String,
      required: true,
      enum: ['X-Small', 'Small', 'Medium', 'Large', 'X-Large'],
    },
    sex: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    color: {
      type: String,
      required: true,
    },
    present: {
      type: Boolean,
    },
    food: {
      type: String,
      required: true,
    },
    dogOwner: {
      type: Schema.Types.ObjectId, 
      ref: 'Account' 
    },
    reports: {
      type: Schema.Types.ObjectId,
      ref: 'Report'
    },
    photo: String,
    comments: [commentSchema],
  },
  { timestamps: true }
)

const Dog = mongoose.model('Dog', dogSchema)

export { Dog }