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

const reportSchema = new Schema(
  {
    duration: {
      type: Number,
      min: .5,
      max: 21,
      required: true,
    },
    boarding: {
      type: Boolean,
      required: true,
    },
    comments: [commentSchema],
    walk: {
      type: Boolean,
    },
    swimming: {
      type: Boolean,
    },
    agility: {
      type: Boolean,
    },
    treat: { 
      type: Boolean,  
    },
    mealCount: {
      type: Number,
      min: 0,
      max: 6,
    },
    feedingTimes: {
      type: [String],
    },
    specialInstructions: {
      type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    dog: { type: Schema.Types.ObjectId, ref: 'Dog' },
  },
  { timestamps: true }
)

const Report = mongoose.model('Report', reportSchema)

export { Report }