import { Router } from 'express';

const router = Router();

import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/job.js';
import { validateJobInput } from '../middleware/validationMiddleware.js';

// router.get('/', getAllJobs)

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
