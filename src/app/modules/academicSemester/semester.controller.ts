import { NextFunction, Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body
    const result = await SemesterService.createSemester(semesterData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)
    const result = await SemesterService.getAllSemesters(paginationOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrived successfully',
      data: result.data,
      meta: result.meta,
    })
    next()
  }
)

export const SemesterController = { createSemester, getAllSemesters }
