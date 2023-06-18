import { Model } from 'mongoose'

export type ISemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type ISemesterTitle = 'Autumn' | 'Fall' | 'Summer'

export type ISemesterCode = '01' | '02' | '03'

type IAcademicSemester = {
  title: ISemesterTitle
  year: number
  code: ISemesterCode
  startMonth: ISemesterMonth
  endMonth: ISemesterMonth
}

type AcademicSemesterModel = Model<IAcademicSemester>

export { IAcademicSemester, AcademicSemesterModel }
