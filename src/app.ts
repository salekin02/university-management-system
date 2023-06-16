import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { SemesterRoutes } from './app/modules/academicSemester/semester.route'
import { UserRoutes } from './app/modules/user/user.route'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes

app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/semesters', SemesterRoutes)

//test route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error')
// })

//global error handler
app.use(globalErrorHandler)

export default app
