import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './semester.interface'

const semesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  semesterSchema
)

export default User
