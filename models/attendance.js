import mongoose from 'mongoose'

const Schema = mongoose.Schema

const attendanceSchema = new Schema(
  {
    dog: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
    },
    date: {
      type: Number,
      required: true,
    },
    present: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
)

const Attendance = mongoose.model('Attendance', attendanceSchema)

export { Attendance }