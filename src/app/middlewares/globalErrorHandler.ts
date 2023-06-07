import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if(err instanceof Error){
  //   res.status(400).json({error:err})
  // }
  // else{
  //   res.status(500).json({error: 'something went wrong'})
  // }
  next(err)

  const statusCode = 500
  const message = 'Something went wrong'
  const errorMessages: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
