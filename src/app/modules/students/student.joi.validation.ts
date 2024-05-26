import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required(),
  middleName: Joi.string().max(20),
  lastName: Joi.string().max(20).required(),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('Male', 'Female'),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emargencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional(),
  presentAddress: Joi.string().required(),
  permenetAddress: Joi.string().required(),
  guadian: guardianSchema.required(),
  localGuadian: localGuardianSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
});

export default studentValidationSchema;
