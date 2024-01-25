import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/user.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/auth.js';

const router = Router();

router.route('/current-user').get(getCurrentUser);
router
  .route('/admin/app-stats')
  .get(authorizePermissions('admin'), getApplicationStats);
router.route('/update-user').patch(validateUpdateUserInput, updateUser);

export default router;
