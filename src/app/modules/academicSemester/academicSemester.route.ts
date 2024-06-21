import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.Controller';
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('superAdmin', 'admin'),
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get(
  '/',
  auth('superAdmin', 'admin', 'faculty', 'student'),
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get(
  '/:id',
  auth('superAdmin', 'admin', 'faculty', 'student'),
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:id',
  auth('superAdmin', 'admin'),
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);
export const AcademicSemesterRoutes = router;
