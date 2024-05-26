import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.Controller';
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);
export const AcademicSemesterRoutes = router;
