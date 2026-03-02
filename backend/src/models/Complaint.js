import pool from '../config/db.js';

class Complaint {
    static async create(complaintData) {
        const { user_id, title, category, description, priority } = complaintData;
        const [result] = await pool.execute(
            'INSERT INTO complaints (user_id, title, category, description, priority) VALUES (?, ?, ?, ?, ?)',
            [user_id, title, category, description, priority]
        );
        return result.insertId;
    }

    static async findAll(filters = {}) {
    let query = `
        SELECT c.*, u.username, u.room_number 
        FROM complaints c 
        JOIN users u ON c.user_id = u.id
    `;

    const conditions = [];
    const values = [];

    if (filters.status) {
        conditions.push('c.status = ?');
        values.push(filters.status);
    }

    if (filters.category) {
        conditions.push('c.category = ?');
        values.push(filters.category);
    }

    if (filters.search) {
        conditions.push('(c.title LIKE ? OR c.description LIKE ?)');
        values.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY c.created_at DESC';

    const [rows] = await pool.execute(query, values);
    return rows;
}

    static async findByUser(userId) {
        const [rows] = await pool.execute(
            'SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT c.*, u.username, u.room_number FROM complaints c JOIN users u ON c.user_id = u.id WHERE c.id = ?',
            [id]
        );
        return rows[0];
    }

    static async updateStatus(id, status) {
        const [result] = await pool.execute(
            'UPDATE complaints SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }
    static async getStats() {
    const [rows] = await pool.execute(`
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as in_progress,
            SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM complaints
    `);

    return rows[0];
}
}

export default Complaint;