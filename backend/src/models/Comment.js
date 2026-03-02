import pool from '../config/db.js';

class Comment {
    static async create({ complaint_id, user_id, message, is_internal }) {
        const [result] = await pool.execute(
            'INSERT INTO comments (complaint_id, user_id, message, is_internal) VALUES (?, ?, ?, ?)',
            [complaint_id, user_id, message, is_internal]
        );
        return result.insertId;
    }

    static async findByComplaint(complaintId) {
        const [rows] = await pool.execute(
            `SELECT c.*, u.username 
             FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.complaint_id = ? 
             ORDER BY c.created_at ASC`,
            [complaintId]
        );
        return rows;
    }
    static async deleteById(id) {
    const [result] = await pool.execute(
        "DELETE FROM comments WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
}
}



export default Comment;