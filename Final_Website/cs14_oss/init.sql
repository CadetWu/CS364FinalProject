-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
);

select * from users;

 --Code From P2
CREATE TABLE UMD(
    student_id INT;
    class_year SMALLINT;
    --Abbreviations: C/MSgt
    cadet_rank VARCHAR(12);
    phone_num VARCHAR(16);
    email_addr VARCHAR(50);
    name VARCHAR(40);
)

CREATE TABLE rooming(
    room_num VARCHAR(5);
    student_id INT
)

CREATE TABLE CQ_shift(
    cq_group VARCHAR(8);
    student_id INT;
    shift_date DATE;
    shift_time TIME;
)

CREATE TABLE SAMI_grades(
    student_id INT;
    --In Percentage;
    SAMI_1 INT;
    SAMI_2 INT;
    SAMI_3 INT;
)

CREATE TABLE birthdays(
    student_id INT;
    birthday DATE;
)

CREATE TABLE lunch_arrangement(
    student_id INT;
    table_id SMALLINT;
)

CREATE TABLE AMI_grades(
    student_id INT;
    --In Percentage;
    AMI_1 INT;
    AMI_2 INT;
    AMI_3 INT;
    AMI_4 INT;
    AMI_5 INT;
    AMI_6 INT;
    AMI_7 INT;
    failures SMALLINT;
)

CREATE TABLE PAI_grades(
    student_id INT;
    --In Percentage;
    PAI_1 INT;
    PAI_2 INT;
    PAI_3 INT;
    failures SMALLINT;
)
-- Insert Sample data

--Data for Brendan Wu
INSERT INTO "UMD" VALUES(3000122112, 2026, "C/MSgt", 5742158606, "c26brendan.wu@afacademy.af.edu", "Brendan Wu");
INSERT INTO "rooming" VALUES("5G67",3000122112);
INSERT INTO "SAMI_grades" VALUES(3000122112, 100, 100, 100);
INSERT INTO "birthdays" VALUES(3000122112,'2004-11-15');
INSERT INTO "lunch_arrangement" VALUES(3000122112, 5);
INSERT INTO "AMI_grades" VALUES(3000122112, 100, 100, 100, 100, 100, 100, 100, 0);
INSERT INTO "PAI_grades" VALUES(3000122112, 100, 100, 100, 100, 100, 100, 100, 0);
--Data for Jack West
INSERT INTO "UMD" VALUES(3000126376, 2026, "C/MSgt", 7154032677, "c26jack.west@afacademy.af.edu", "Jack West");
INSERT INTO "rooming" VALUES("5G73",3000126376);
INSERT INTO "SAMI_grades" VALUES(3000126376, 100, 100, 100);
INSERT INTO "birthdays" VALUES(3000126376,'2003-11-10');
INSERT INTO "lunch_arrangement" VALUES(3000126376, 5);
INSERT INTO "AMI_grades" VALUES(3000126376, 100, 100, 100, 100, 100, 100, 100, 0);
INSERT INTO "PAI_grades" VALUES(3000126376, 100, 100, 100, 100, 100, 100, 100, 0);
--CQ
INSERT INTO "CQ_shift" VALUES("Alpha", 3000126376, '2025-04-21', 1600);
INSERT INTO "CQ_shift" VALUES("Alpha", 3000122112, '2025-04-21', 1915);
