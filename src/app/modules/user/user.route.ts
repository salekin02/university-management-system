import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequests'
import { UserValidation } from './user.validation'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
