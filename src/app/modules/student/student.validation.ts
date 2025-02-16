import { z } from 'zod'

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    email: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: z.object({
      fatherName: z.string().optional(),
      motherName: z.string().optional(),
      fatherContactNo: z.string().optional(),
    }).optional(),
  }),
})

export const StudentValidation = {
 updateStudentZodSchema,
}
