import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/user.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/current-user').get(getCurrentUser);
router.route('/admin/app-stats').get(getApplicationStats);
router.route('/update-user').patch(validateUpdateUserInput, updateUser);

export default router;
