import { RequestHandler } from 'express'
import { UserService } from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(201).json({
      success: true,
      data: result,
      message: 'User created successfully',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    next(error)
  }
}

export const UserController = { createUser }
