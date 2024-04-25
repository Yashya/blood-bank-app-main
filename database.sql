CREATE TABLE credentials (
    id varchar(20) PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20)
);

CREATE TABLE users (
    user_id varchar(20) PRIMARY KEY,
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
    hospital_id varchar(20) PRIMARY KEY,
    name VARCHAR(20),
    contact_number BIGINT,
    email VARCHAR(20),
    address VARCHAR(20),
    FOREIGN KEY (hospital_id) REFERENCES credentials(id) 
);

CREATE TABLE request_blood (
    request_id varchar(20) PRIMARY KEY,
    hospital_id varchar(20) DEFAULT NULL,
    patient_id varchar(20) DEFAULT NULL,
    blood_group VARCHAR(20),
    required_quantity INT,
    status VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
    FOREIGN KEY (patient_id) REFERENCES users(user_id)
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    amount INT,
    request_id varchar(20),
    FOREIGN KEY (request_id) REFERENCES request_blood(request_id)
);

CREATE TABLE blood_samples (
    sample_id varchar(20) PRIMARY KEY,
    audit_log_id varchar(20),
    donor_id varchar(20),
    nurse_id varchar(20),
    blood_group VARCHAR(20),
    center_name VARCHAR(20),
    collection_date DATE,
    volume INT,
    centre_id INT,
    FOREIGN KEY (centre_id) references donation_centers(center_id),
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
	feedback_id int primary key auto_increment,
    user_id varchar(20) ,
    feedback_text VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE audit_log (
    id varchar(20) PRIMARY KEY,
    sample_id varchar(20),
    request_id varchar(20),
    center_id INT,
    action VARCHAR(20),
    blood_group VARCHAR(20),
    timestamp TIMESTAMP,
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

ALTER TABLE credentials
MODIFY id VARCHAR(20);



