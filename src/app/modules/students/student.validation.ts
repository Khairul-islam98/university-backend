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
    password: z.string().max(20).optional(),
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
      academicDepartment: z.string(),
      // profileImg: z.string().optional(),
      isActive: z.enum(['active', 'inactive']).default('active'),
      isDeleted: z.boolean(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name can not be more than 20 characters')
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().max(20).optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emargencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().optional(),
      permenetAddress: z.string().optional(),
      guadian: updateGuardianValidationSchema.optional(),
      localGuadian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
      isActive: z.enum(['active', 'inactive']).default('active'),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const studentValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
