import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../students/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoute = router;
