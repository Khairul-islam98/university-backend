import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../students/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UservalidationSchema } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
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
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UservalidationSchema.changeStatusValidationSchema),
  UserController.changeStatus,
);
router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);
export const UserRoute = router;
