import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-offered-course',
  auth('superAdmin', 'admin'),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.get(
  '/',
  auth('superAdmin', 'admin', 'faculty'),
  OfferedCourseControllers.getAllOfferedCourse,
);
router.get(
  '/my-offered-courses',
  auth('student'),
  OfferedCourseControllers.getMyOfferedCourses,
);
router.get(
  '/:id',
  auth('superAdmin', 'admin', 'faculty', 'student'),
  OfferedCourseControllers.getSingleOfferedCourse,
);
router.patch(
  '/:id',
  auth('superAdmin', 'admin'),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.delete(
  '/:id',
  auth('superAdmin', 'admin'),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
