import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './semester.interface'
import {
  semesterCodes,
  semesterMonths,
  semesterTitles,
} from './semester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const semesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

semesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exist')
  }
  next()
})

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  semesterSchema
)

export default AcademicSemester
