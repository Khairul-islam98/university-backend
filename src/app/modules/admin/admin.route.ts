import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
