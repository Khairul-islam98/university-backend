import express from 'express';
import { StudentController } from './student.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// will call controller function
router.get('/', auth('superAdmin', 'admin'), StudentController.getAllStudents);

router.get(
  '/:studentId',
  auth('superAdmin', 'admin', 'faculty'),
  StudentController.getSingleStudent,
);
router.delete(
  '/:studentId',
  auth('superAdmin', 'admin'),
  StudentController.deleteStudent,
);
router.patch(
  '/:studentId',
  auth('superAdmin', 'admin'),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
