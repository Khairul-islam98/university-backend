import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/', auth('superAdmin', 'admin'), AdminControllers.getAllAdmin);
router.get(
  '/:id',
  auth('superAdmin', 'admin'),
  AdminControllers.getSingleAdmin,
);
router.patch(
  '/:id',
  auth('superAdmin'),
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', auth('superAdmin'), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
