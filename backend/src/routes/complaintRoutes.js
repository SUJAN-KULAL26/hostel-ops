import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';
import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus,
    getComplaintStats
} from '../controllers/complaintController.js';
const router = express.Router();

router.use(authenticate);

router.post('/', createComplaint);
router.get('/my-complaints', getMyComplaints);



// Admin only routes
router.get('/all', isAdmin, getAllComplaints);
router.get('/stats', isAdmin, getComplaintStats);
router.patch('/:id/status', isAdmin, updateComplaintStatus);

export default router;