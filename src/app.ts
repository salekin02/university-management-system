import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './modules/users/users.route'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes

app.use('/api/v1/users', UserRoutes)

//test route
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  next('new error')
})

//global error handler
app.use(globalErrorHandler)

export default app
