-- Clear existing data
DELETE FROM leaderboards;
DELETE FROM users;
ALTER TABLE leaderboards AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;

-- Insert test users
INSERT INTO users (username, email, password) VALUES 
('TestUser1', 'test1@example.com', '$2a$10$ENCRYPTED_PASSWORD_HASH'),
('TestUser2', 'test2@example.com', '$2a$10$ENCRYPTED_PASSWORD_HASH'),
('TestUser3', 'test3@example.com', '$2a$10$ENCRYPTED_PASSWORD_HASH');

-- Insert test leaderboard entries
INSERT INTO leaderboards (problem_id, username, time_in_seconds, completed_at) VALUES 
(1, 'TestUser1', 120, '2024-11-19 01:00:00'),
(1, 'TestUser2', 180, '2024-11-19 01:30:00'),
(2, 'TestUser1', 300, '2024-11-19 02:00:00'),
(2, 'TestUser3', 240, '2024-11-19 02:30:00'),
(3, 'TestUser2', 150, '2024-11-19 03:00:00');
