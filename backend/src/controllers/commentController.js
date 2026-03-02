import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { message, is_internal } = req.body;

        const commentId = await Comment.create({
            complaint_id: complaintId,
            user_id: req.user.id,
            message,
            is_internal: is_internal || false
        });

        res.status(201).json({ message: 'Comment added', commentId });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Comment.deleteById(id);

        if (!deleted) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Delete comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getComments = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const comments = await Comment.findByComplaint(complaintId);

        res.json(comments);
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};