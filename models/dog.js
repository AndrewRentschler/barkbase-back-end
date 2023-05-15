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
    },
    size: {
      type: String,
      required: true,
      enum: ['X-Small', 'Small', 'Medium', 'Large', 'X-Large'],
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
    owner: {
      type: Schema.Types.ObjectId, 
      ref: 'Profile' 
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