import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    // role: z.string({
    //   required_error: 'Role is required',
    // }),
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood group is required',
      }),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
      }),
    }),
  }),
})
export const UserValidation = {
  createUserZodSchema,
}
