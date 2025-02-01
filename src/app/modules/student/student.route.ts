import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
const router = express.Router()

router.get('/:id', StudentController.getStudent)
router.get('/', StudentController.getStudents)

router.delete('/:id', StudentController.deleteStudent)

router.patch(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

export const StudentRoutes = router
