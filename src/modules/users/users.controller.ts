import { Request, Response } from 'express'
import usersService from './users.service'

 const createUser = async (req: Request, res: Response) => {
  try {
    const {user} = req.body
    const result = await usersService.createUser(user)
    res.status(201).json({
        success: true,
        data: result,
        message: 'User created successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      succuss: false,
      message: error.message,
    })
  }
}

    export default { createUser }
