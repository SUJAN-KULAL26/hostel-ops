import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { addComment, getComments } from '../controllers/commentController.js';
import { deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.use(authenticate);

router.post('/:complaintId', addComment);
router.get('/:complaintId', getComments);
router.delete("/:id", authenticate, deleteComment);

export default router;