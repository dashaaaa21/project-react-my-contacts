import express from 'express';
import { getStatuses, createStatus, updateStatus, deleteStatus } from '../controllers/statuses-controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getStatuses);
router.post('/', createStatus);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

export default router;
