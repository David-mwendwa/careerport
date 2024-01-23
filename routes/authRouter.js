import { Router } from 'express';
import { login, register } from '../controllers/user.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(login);

export default router;
