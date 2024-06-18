import express from 'express';
import { StudentController } from './student.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// will call controller function
router.get('/', StudentController.getAllStudents);

router.get(
  '/:studentId',
  auth('admin', 'faculty'),
  StudentController.getSingleStudent,
);
router.delete('/:studentId', StudentController.deleteStudent);
router.patch('/:studentId', StudentController.updateStudent);

export const StudentRoutes = router;
