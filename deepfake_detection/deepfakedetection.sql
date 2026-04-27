CREATE DATABASE deepfake_project;
USE deepfake_project;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM users;

CREATE TABLE media_data (
    media_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    media_type VARCHAR(50), -- image...
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);
SELECT * FROM media_data;


CREATE TABLE detection_result (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT,
    result VARCHAR(50), -- Real / Fake
    confidence FLOAT,
    detection_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (media_id) REFERENCES media_data(media_id)
    ON DELETE CASCADE
);
select * from detection_result;

CREATE TABLE system_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    log_time DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
select * from system_logs;