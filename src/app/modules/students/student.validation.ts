import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name can not be more than 20 characters'),
  middleName: z.string(),
  lastName: z.string().max(20),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emargencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string(),
      permenetAddress: z.string(),
      guadian: guardianValidationSchema,
      localGuadian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      AcademicDepartment: z.string(),
      profileImg: z.string().optional(),
      isActive: z.enum(['active', 'inactive']).default('active'),
      isDeleted: z.boolean(),
    }),
  }),
});

export const studentValidationSchema = {
  createStudentValidationSchema,
};
