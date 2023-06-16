import { RequestHandler } from 'express'
import { SemesterService } from './semester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
   const { ...semesterData } = req.body;
    const result = await SemesterService.createSemester(semesterData);

    res.status(201).json({
      success: true,
      data: result,
      message: 'Semester created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const SemesterController = { createSemester }
