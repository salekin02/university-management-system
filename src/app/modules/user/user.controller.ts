import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(201).json({
      success: true,
      data: result,
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = { createUser }
