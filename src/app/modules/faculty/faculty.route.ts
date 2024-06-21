import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth('superAdmin', 'admin', 'faculty'),
  FacultyControllers.getAllFaculty,
);
router.get(
  '/:facultyId',
  auth('superAdmin', 'admin', 'faculty'),
  FacultyControllers.getSingleFaculty,
);
router.patch(
  '/:id',
  auth('superAdmin', 'admin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
router.delete(
  '/:id',
  auth('superAdmin', 'admin'),
  FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;
