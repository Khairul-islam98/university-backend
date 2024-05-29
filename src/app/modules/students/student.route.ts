import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call controller function
router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);
router.put(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
