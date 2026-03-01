import pool from '../config/db.js';

class User {
    static async create(userData) {
        const { username, email, password, role = 'student', room_number } = userData;
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password, role, room_number) VALUES (?, ?, ?, ?, ?)',
            [username, email, password, role, room_number]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT id, username, email, role, room_number FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

export default User;