import ApiError from '../../../errors/ApiError'
import { semesterTitleCodeMapper } from './semester.constant'
import { IAcademicSemester } from './semester.interface'
import AcademicSemester from './semester.model'
import httpStatus from 'http-status'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST,'Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const SemesterService = {
  createSemester,
}
