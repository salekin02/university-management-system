import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_student_pass as string
  }

  // set role

  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(student.academicSemester)

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })

    if (!newStudent || newStudent.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Student could not be created')
    }

    // set student _id into user
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser || newUser.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User could not be created')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()


  } catch (err) {
    await session.commitTransaction()
    await session.endSession()
    throw err;
  }

  if(newUserAllData){
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty'
        }
      ]
    })
  }
  return newUserAllData

}

export const UserService = {
  createStudent,
}
