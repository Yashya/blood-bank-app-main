CREATE TABLE credentials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20),
    password VARCHAR(20)
);

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    address VARCHAR(20),
    date_of_birth DATE,
    role VARCHAR(20) DEFAULT 'user',
    gender VARCHAR(10),
    blood_group VARCHAR(10),
    contact_number BIGINT,
    FOREIGN KEY (user_id) REFERENCES credentials(id) 
);

CREATE TABLE hospitals (
    hospital_id INT PRIMARY KEY,
    name VARCHAR(20),
    contact_number BIGINT,
    email VARCHAR(20),
    address VARCHAR(20),
    FOREIGN KEY (hospital_id) REFERENCES credentials(id) 
);

CREATE TABLE request_blood (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_id INT DEFAULT NULL,
    patient_id INT DEFAULT NULL,
    blood_group VARCHAR(20),
    required_quantity INT,
    status VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
    FOREIGN KEY (patient_id) REFERENCES users(user_id)
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    amount INT,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES request_blood(request_id)
);

CREATE TABLE blood_samples (
    sample_id INT PRIMARY KEY AUTO_INCREMENT,
    audit_log_id INT,
    donor_id INT,
    nurse_id INT,
    blood_group VARCHAR(20),
    center_name VARCHAR(20),
    collection_date DATE,
    volume INT,
    FOREIGN KEY (audit_log_id) REFERENCES audit_log(id),
    FOREIGN KEY (donor_id) REFERENCES users(user_id),
    FOREIGN KEY (nurse_id) REFERENCES users(user_id),
    FOREIGN KEY (center_name) REFERENCES donation_centers(name)
);

CREATE TABLE donation_centers (
    center_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE,
    contact_number BIGINT,
    email VARCHAR(20),
    address VARCHAR(20)
);

CREATE TABLE feedback (
    user_id INT PRIMARY KEY,
    feedback_text VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sample_id INT,
    request_id INT,
    center_id INT,
    action VARCHAR(20),
    blood_group VARCHAR(20),
    timestamp TIMESTAMP,
    FOREIGN KEY (sample_id) REFERENCES blood_samples(sample_id),
    FOREIGN KEY (request_id) REFERENCES request_blood(request_id),
    FOREIGN KEY (center_id) REFERENCES donation_centers(center_id)
);

ALTER TABLE users
ADD CONSTRAINT unique_email
UNIQUE (email);

ALTER TABLE users
ADD CONSTRAINT unique_contact_number
UNIQUE (contact_number);

ALTER TABLE credentials
ADD CONSTRAINT unique_username
UNIQUE (username);

ALTER TABLE hospitals
ADD CONSTRAINT unique_hospital_email
UNIQUE (email);

ALTER TABLE hospitals
ADD CONSTRAINT unique_hospital_contact_number
UNIQUE (contact_number);

ALTER TABLE blood_samples
ADD COLUMN centre_id INT;

ALTER TABLE blood_samples
ADD CONSTRAINT fk_centre_id
FOREIGN KEY (centre_id) REFERENCES donation_centers(center_id);


