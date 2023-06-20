import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicSemesterFilterFields } from './semester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester created successfully',
    data: result,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await SemesterService.getAllSemesters(
    filters,
    paginationOptions
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SemesterService.getSemesterById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  })
})
const updateSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body
  const result = await SemesterService.updateSemesterById(id, updateData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  })
})
const deleteSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SemesterService.deleteSemesterById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  })
})

export const SemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemesterById,
  deleteSemesterById,
}
