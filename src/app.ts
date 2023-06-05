import express, { Application, Request, Response } from 'express'
import usersService from './modules/users/users.service'
import userRouter from './modules/users/users.route'
const app: Application = express()
import cors from 'cors'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
console.log(app.get('env'))
app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '1',
    password: '1234',
    role: 'admin',
  })
  res.send('Hello World!')
})

export default app
