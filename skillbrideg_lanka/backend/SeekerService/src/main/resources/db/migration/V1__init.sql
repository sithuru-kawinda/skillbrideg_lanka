CREATE TABLE seekers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auth_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nic VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    CONSTRAINT uk_seekers_auth_id UNIQUE (auth_id),
    CONSTRAINT uk_seekers_email UNIQUE (email),
    CONSTRAINT uk_seekers_nic UNIQUE (nic)
);
