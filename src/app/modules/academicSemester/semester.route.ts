import express from 'express'
import { SemesterValidation } from './semester.validation'
import validateRequest from '../../middlewares/validateRequests'
import { SemesterController } from './semester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterController.createSemester
)

router.get('/:id', SemesterController.getSemesterById)
router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  SemesterController.updateSemesterById
)
router.delete('/:id', SemesterController.deleteSemesterById)
router.get('/', SemesterController.getAllSemesters)

export const SemesterRoutes = router
