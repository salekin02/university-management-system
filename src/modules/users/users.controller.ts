import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
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

export default { createUser }
