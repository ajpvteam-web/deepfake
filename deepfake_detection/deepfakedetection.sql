CREATE DATABASE deepfake_project;
USE deepfake_project;
CREATE TABLE users (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(100) UNIQUE NOT NULL,
 password VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
 
 CREATE TABLE uploaded_images (
 id INT PRIMARY KEY AUTO_INCREMENT, 
 user_id INT,
 image_name VARCHAR(150), 
 image_path VARCHAR(255), -- Flask server pe stored path file_size INT, -- bytes mein uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 FOREIGN KEY (user_id) REFERENCES users(id) );
 
 CREATE TABLE detection_results ( 
 id INT PRIMARY KEY AUTO_INCREMENT, 
 image_id INT, 
 is_real BOOLEAN, -- TRUE = Real, FALSE = Fake confidence FLOAT, -- Model ki accuracy % (0.0 to 1.0) model_used VARCHAR(100), -- TensorFlow/Keras model name detection_time FLOAT, -- kitne seconds lage analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 FOREIGN KEY (image_id) REFERENCES uploaded_images(id) );
 
 
 CREATE TABLE detection_logs ( 
 id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT, 
 image_id INT,
 status ENUM('success', 'failed', 'processing'), 
 error_msg TEXT, -- agar error aaya toh log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), 
 FOREIGN KEY (image_id) REFERENCES uploaded_images(id) );
