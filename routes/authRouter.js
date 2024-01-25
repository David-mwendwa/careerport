import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;
