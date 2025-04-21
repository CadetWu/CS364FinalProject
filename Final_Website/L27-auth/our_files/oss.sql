-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    student_id INT NOT NULL UNIQUE PRIMARY KEY, 
    hash CHAR(128) NOT NULL, -- password
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user' -- role
);

select * from users;