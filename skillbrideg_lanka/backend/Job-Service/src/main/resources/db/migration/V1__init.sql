CREATE TABLE jobs (
    job_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_name VARCHAR(255) NOT NULL,
    job_description VARCHAR(1000) NOT NULL,
    job_status VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    duration_month INT NOT NULL,
    salary BIGINT NOT NULL,
    recruiter_id BIGINT NOT NULL
);
