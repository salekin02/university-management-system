import { ISemesterMonth, ISemesterTitle, ISemesterCode } from './semester.interface'

export const semesterMonths: ISemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const semesterTitles: ISemesterTitle[]= ['Autumn', 'Summer', 'Fall']

export const semesterCodes: ISemesterCode[] = ['01', '02', '03']

export const semesterTitleCodeMapper:{
  [key:string]:string
}={
  'Autumn':'01',
  'Summer':'02',
  'Fall':'03'
}