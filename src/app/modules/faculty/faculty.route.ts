import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculty);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
