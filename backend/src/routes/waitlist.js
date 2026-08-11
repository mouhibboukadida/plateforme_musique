
import express from 'express';
import {
  addToWaitlist,
  getAllMembers,
  updateStatus,
  deleteMember,
  getStats
} from '../controllers/waitlist.js';
import { validateWaitlist } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateWaitlist, addToWaitlist);
router.get('/', getAllMembers);
router.get('/stats', getStats);
router.put('/:id/status', updateStatus);
router.delete('/:id', deleteMember);

export default router;