-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
);

select * from users;

 --Code From P2
CREATE TABLE IF NOT EXISTS UMD (
    student_id VARCHAR(100) PRIMARY KEY,
    class_year SMALLINT,
    --Abbreviations: C/MSgt
    cadet_rank VARCHAR(12),
    phone_num VARCHAR(16),
    email_addr VARCHAR(50),
    name VARCHAR(40)
);
INSERT INTO UMD (student_id, class_year, cadet_rank, phone_num, email_addr, name)
VALUES
    (3000126376, 2026, 'C/MSgt', '7154032677', 'c26jack.west@afacademy.af.edu', 'Jack West'),
    (3000122112, 2026, 'C/MSgt', '5742158606', 'c26brendan.wu@afacademy.af.edu', 'Brendan Wu'),
    /*Fake Data Below */
    (3000121001, 2025, 'C/Capt', '7195550101', 'c25john.smith@afacademy.af.edu', 'John Smith'),
    (3000121002, 2026, 'C/TSgt', '7195550102', 'c26emily.johnson@afacademy.af.edu', 'Emily Johnson'),
    (3000121003, 2027, 'C/SSgt', '7195550103', 'c27michael.williams@afacademy.af.edu', 'Michael Williams'),
    (3000121004, 2028, 'C/Amn', '7195550104', 'c28sarah.brown@afacademy.af.edu', 'Sarah Brown'),
    (3000121005, 2025, 'C/Capt', '7195550105', 'c25david.jones@afacademy.af.edu', 'David Jones'),
    (3000121006, 2026, 'C/MSgt', '7195550106', 'c26jennifer.garcia@afacademy.af.edu', 'Jennifer Garcia'),
    (3000121007, 2027, 'C/SSgt', '7195550107', 'c27roberta.miller@afacademy.af.edu', 'Robert Miller'),
    (3000121008, 2027, 'C/SSgt', '7195550108', 'c28lisa.davis@afacademy.af.edu', 'Lisa Davis'),
    (3000121009, 2025, 'C/1Lt', '7195550109', 'c25daniel.wilson@afacademy.af.edu', 'Daniel Wilson'),
    (3000121010, 2028, 'C/Amn', '7195550110', 'c28amy.martinez@afacademy.af.edu', 'Amy Martinez');


select * from UMD;

CREATE TABLE rooming(
    room_num VARCHAR(5),
    student_id VARCHAR(100)
);
INSERT INTO rooming(room_num, student_id)
VALUES
    ('5G31', 3000126376), --Jack West
    ('5G31', 3000122112), --Brendan Wu
    ('5G30', 3000121002), --Emily
    ('5G30', 3000121006), --Jennifer
    ('5G32', 3000121001), --John
    ('5G32', 3000121003), --Michael
    ('5G34', 3000121005), --David
    ('5G34', 3000121009), --Daniel
    ('5G35', 3000121004), --Sarah
    ('5G35', 3000121010), --Amy
    ('5G37', 3000121007), --Roberta
    ('5G37', 3000121008); --Lisa

select * from rooming;

-- CREATE TABLE CQ_shift(
--     cq_group ENUM('Alpha', 'Bravo', 'Charlie') NOT NULL,
--     student_id VARCHAR(100),
--     shift_date DATE,
--     shift_time TIME
-- );

-- INSERT INTO CQ_shift(cq_group, student_id, shift_date, shift_time)
-- VALUES
--     ('Alpha', 3000122001, 2025-05-12, 1600),
--     ('Alpha', 3000122002, 2025-05-13, 1600),
--     ('Alpha', 3000122003, 2025-05-14, 1600),
--     ('Alpha', 3000122004, 2025-05-15, 1600),
--     ('Alpha', 3000122005, 2025-05-16, 1600),
--     ('Alpha', 3000122006, 2025-05-17, 1600),
--     ('Alpha', 3000122007, 2025-05-18, 1600);

CREATE TABLE SAMI_grades(
    student_id VARCHAR(100),
    --In Percentage;
    SAMI_1 INT,
    SAMI_2 INT,
    SAMI_3 INT
);
INSERT INTO SAMI_grades(student_id,SAMI_1,SAMI_2,SAMI_3)
VALUES
    (3000126376, 100, 100, 68), --Jack West
    (3000122112, 100, 100, 68), --Brendan Wu
    (3000121002, 75, 100, 98), --Emily
    (3000121006, 75, 100, 98), --Jennifer
    (3000121001, 88, 92, 96), --John
    (3000121003, 88, 92, 96), --Michael
    (3000121005, 100, 96, 100), --David
    (3000121009, 100, 96, 100), --Daniel
    (3000121004, 75, 68, 100), --Sarah
    (3000121010, 75. 68, 100), --Amy
    (3000121007, 96, 96, 92), --Roberta
    (3000121008, 96, 96, 92); --Lisa

select * from SAMI_grades;

CREATE TABLE birthdays(
    student_id VARCHAR(100);
    birthday DATE
);
INSERT INTO birthdays (student_id,birthday)
VALUES
    (3000126376, 2003-11-10), --Jack West
    (3000122112, 2004-11-15), --Brendan Wu
    (3000121002, 2003-09-24), --Emily
    (3000121006, 2003-12-18), --Jennifer
    (3000121001, 2002-03-03), --John
    (3000121003, 2005-01-18), --Michael
    (3000121005, 2003-01-22), --David
    (3000121009, 2003-08-07), --Daniel
    (3000121004, 2006-04-28), --Sarah
    (3000121010, 2005-09-14), --Amy
    (3000121007, 2003-04-12), --Roberta
    (3000121008, 2004-10-05); --Lisa

select * from birthdays;

CREATE TABLE lunch_arrangement(
    student_id VARCHAR(100),
    table_id SMALLINT
);
INSERT INTO lunch_arrangement (student_id,table_id)
VALUES
    (3000126376, 1), --Jack West
    (3000122112, 1), --Brendan Wu
    (3000121002, 1), --Emily
    (3000121006, 1), --Jennifer
    (3000121001, 1), --John
    (3000121003, 1), --Michael
    (3000121005, 2), --David
    (3000121009, 2), --Daniel
    (3000121004, 2), --Sarah
    (3000121010, 2), --Amy
    (3000121007, 2), --Roberta
    (3000121008, 2); --Lisa

select * from lunch_arrangement;

CREATE TABLE AMI_grades(
    student_id VARCHAR(100),
    --In Percentage;
    AMI_1 INT,
    AMI_2 INT,
    AMI_3 INT,
    AMI_4 INT,
    AMI_5 INT,
    AMI_6 INT,
    AMI_7 INT
);
INSERT INTO AMI_grades(student_id,AMI_1,AMI_2,AMI_3, AMI_4,AMI_5,AMI_6,AMI_7)
VALUES
    (3000126376, 100, 100, 68, 88, 88, 86, 92), --Jack West
    (3000122112, 100, 100, 68, 88, 88, 86, 92), --Brendan Wu
    (3000121002, 75, 100, 98, 92, 75, 100, 100), --Emily
    (3000121006, 75, 100, 98, 92, 75, 100, 100), --Jennifer
    (3000121001, 88, 92, 96, 100, 96, 96, 84), --John
    (3000121003, 88, 92, 96, 100, 96, 96, 84), --Michael
    (3000121005, 100, 96, 100, 88, 92, 96, 100), --David
    (3000121009, 100, 96, 100, 88, 92, 96, 100), --Daniel
    (3000121004, 75, 68, 100, 100, 88, 92, 96), --Sarah
    (3000121010, 75, 68, 100, 100, 88, 92, 96), --Amy
    (3000121007, 96, 96, 92, 75, 100, 100, 20), --Roberta
    (3000121008, 96, 96, 92, 75, 100, 100, 20); --Lisa

select * from AMI_grades;

CREATE TABLE PAI_grades(
    student_id VARCHAR(100),
    --In Percentage;
    PAI_1 INT,
    PAI_2 INT,
    PAI_3 INT
);
INSERT INTO PAI_grades(student_id,PAI_1,PAI_2,PAI_3)
VALUES
    (3000126376, 100, 100, 100), --Jack West
    (3000122112, 100, 100, 96), --Brendan Wu
    (3000121002, 100, 96, 96), --Emily
    (3000121006, 100, 100, 100), --Jennifer
    (3000121001, 100, 100, 100), --John
    (3000121003, 100, 92, 96), --Michael
    (3000121005, 100, 100, 100), --David
    (3000121009, 100, 96, 100), --Daniel
    (3000121004, 75, 100, 100), --Sarah
    (3000121010, 100, 100, 100), --Amy
    (3000121007, 100, 100, 100), --Roberta
    (3000121008, 100, 100, 100); --Lisa

select * from PAI_grades;

