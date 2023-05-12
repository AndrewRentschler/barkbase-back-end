import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
    meal: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'None'],
    },
  },
  { timestamps: true }
)

const Report = mongoose.model('Report', reportSchema)

export { Report }