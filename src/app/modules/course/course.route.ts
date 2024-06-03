import express from 'express';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
