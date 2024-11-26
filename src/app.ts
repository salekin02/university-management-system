import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import { generateStudentId } from './app/modules/user/user.utils'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes

app.use('/api/v1/', routes)

//global error handler
app.use(globalErrorHandler)

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
  })
  next()
});

(async () => {
  const academicSemester = {
    code: '01',
    year: '2021',
  }

  const testId = await generateStudentId(academicSemester)
  console.log(testId)
})()

export default app
