import Complaint from '../models/Complaint.js';

export const createComplaint = async (req, res) => {
    try {
        const { title, category, description, priority } = req.body;
        const userId = req.user.id;

        const complaintId = await Complaint.create({
            user_id: userId,
            title,
            category,
            description,
            priority
        });

        res.status(201).json({ message: 'Complaint created successfully', complaintId });
    } catch (error) {
        console.error('Create complaint error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.findByUser(req.user.id);
        res.json(complaints);
    } catch (error) {
        console.error('Get complaints error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllComplaints = async (req, res) => {
    try {
        const { status, category, search } = req.query;
        const complaints = await Complaint.findAll({ status, category, search });
        res.json(complaints);
    } catch (error) {
        console.error('Get all complaints error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Complaint.updateStatus(id, status);
        
        if (!updated) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint status updated successfully' });
    } catch (error) {
        console.error('Update complaint error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getComplaintStats = async (req, res) => {
    try {
        const stats = await Complaint.getStats();
        res.json(stats);
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};