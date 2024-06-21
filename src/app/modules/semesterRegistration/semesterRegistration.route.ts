import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth('superAdmin', 'admin'),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth('superAdmin', 'admin', 'faculty', 'student'),
  SemesterRegistrationControllers.getAllSemesterRegistration,
);
router.get(
  '/:id',
  auth('superAdmin', 'admin', 'faculty', 'student'),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth('superAdmin', 'admin'),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
router.delete(
  '/:id',
  auth('superAdmin', 'admin'),
  SemesterRegistrationControllers.deletedSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
