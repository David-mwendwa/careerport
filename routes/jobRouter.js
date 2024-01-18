import { Router } from 'express';

const router = Router();

import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/job.js';

// router.get('/', getAllJobs)

router.route('/').get(createJob).post(getAllJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
