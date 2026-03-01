CREATE DATABASE IF NOT EXISTS hostel_db;
USE hostel_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    room_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints table
CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    category ENUM('plumbing', 'electrical', 'furniture', 'cleaning', 'other') NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('pending', 'in-progress', 'resolved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin (password: admin123 - you need to hash this)
-- Note: Run this after backend is running to create hashed password
-- INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@hostel.com', '$2a$10$YourHashedPasswordHere', 'admin');