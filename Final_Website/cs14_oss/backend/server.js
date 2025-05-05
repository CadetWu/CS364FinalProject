//file: server.js
 
const express = require("express");
const crypto = require('crypto');
const session = require("express-session");
const pool = require('./db');
const auth = require("./auth");
require("dotenv").config();

const app = express();
const saltRounds = 10;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false} // would be set to true if using HTTPS
  })
);

// app.post("/register", auth.register);
app.post("/register", async (req, res) => {

  console.log("server.js: register ");
  const { username, email, password, role } = req.body;

  console.log(`server.js: register username: ${username}`);
  console.log(`server.js: register email: ${email}`);
  console.log(`server.js: register password: ${password}`);
  console.log(`server.js: register role: ${role}`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  const query = 'INSERT INTO users (username, email, hash, salt, role) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  const values = [username, email, hash, salt, role];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `${role} account created`, username: `${username}` }); 
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Student ID or email already exists.' });
  }
});

app.post("/login", auth.login);

app.get("/users", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /users");
  const result = await pool.query("SELECT username, email, role FROM users");
  console.log(`GET /users rows: ${result.rows}`);
  res.json(result.rows);
});
// self created for truncate
// For UMD table
app.get("/umd", auth.ensureAdmin, async (req, res) => {
  // may not be pulling form data from json body right
    const { num_rows } = req.body;
    console.log("in GET /umd");
    const result = await pool.query("SELECT student_id, class_year, cadet_rank, phone_num, email_addr, name FROM UMD");
    console.log(`GET /umd rows: ${result.rows}`);
    res.json(result.rows);
});

//To get User UMD
app.post("/userUMD", async (req,res) => {
    const { student_id } = req.body;
    const query = 'SELECT * FROM umd LEFT JOIN rooming ON umd.student_id = rooming.student_id WHERE umd.student_id = $1';
    const values = [student_id];
    try{
      const result = await pool.query(query,values);
      console.log(result.rows);
      res.json(result.rows);
    }
    catch (error) {
      console.log("in catch block of server.js/userUMD");
      console.log(error);
      res.json({ success: false, message: 'Not Querying' });
    }
});
//User's AMI Grades
app.post("/userAMI", async (req,res) => {
  const { student_id } = req.body;
  const query = 'SELECT * FROM AMI_grades WHERE student_id = $1';
  const values = [student_id];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

//User's SAMI
app.post("/userSAMI", async (req,res) => {
  const { student_id } = req.body;
  const query = 'SELECT * FROM SAMI_grades WHERE student_id = $1';
  const values = [student_id];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

//User's PAI
app.post("/userPAI", async (req,res) => {
  const { student_id } = req.body;
  const query = 'SELECT * FROM PAI_grades WHERE student_id = $1';
  const values = [student_id];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});


//To get User Rooming
// app.get("/userRooming", async (req,res) => {
//   const { room_num, student_id} = req.body;
//   const result = await pool.query("SELECT room_num, student_id FROM UMD WHERE student_id = $1");
//   res.json(results);
// });


app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

app.get("/session", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// self created for truncate
// For UMD table
app.get("/truncate", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /truncate");
  const result = await pool.query("DELETE FROM UMD");
  console.log(`GET /truncate rows: ${result.rows}`);
  res.json(result.rows);
});

app.post("/add_info", auth.ensureAdmin, async (req, res) => {
  console.log("in display");
  const { table, column, new_data, student_id } = req.body;

  const query = 'UPDATE $1 SET $2 = $3 WHERE student_id = $4'; 

  const values = [ table, column, new_data, student_id];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("adding new information");
    console.log(result);
    res.json({ success: true, message: `info added` });
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Info could not be added' });
  }

});

app.post("/display_given_table", auth.ensureAdmin, async (req, res) => {
  const { table } = req.body;
  console.log("in GET /display_given_table");
  console.log(table);
  // table and validation if statement taken from PerplexityAI
  const allowedTables = ['UMD', 'AMI_grades', 'SAMI_grades', 'PAI_grades', 'rooming', 'lunch_arrangement', 'birthdays'];
  
  // Validate the table name (from PerplexityAI)
  if (!allowedTables.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table name' });
  }

  // Figure out what table was asked for
  let query;
  if (table == 'UMD') {
    query = `SELECT * from ${table}`;
    console.log("UMD table!!");
  }
  else {
    query = `SELECT * from ${table} INNER JOIN umd ON umd.student_id = ${table}.student_id`;
  }
  //const value = [table]

  //const query = `SELECT * from ${table}`;

  try {
    //const result = await pool.query(query, value);
    const result = await pool.query(query);
    //console.log("user NOW registered ... going to respond");
    //console.log(result);
    //res.json({ success: true, message: `table data gathered` });
    res.json(result.rows);
  } catch (error) {
    console.log("in catch block of server.js/display_given_table");
    console.log(error);
    res.json({ success: false, message: 'Table data could not be gathered' });
  }
  //console.log(`GET /display_given_table rows: ${result.rows}`);
  //res.json(result.rows); 

});


// API calls for GPAdmin
//To get User UMD
app.post("/cobraUMD", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM umd LEFT JOIN rooming ON umd.student_id = rooming.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/cobraUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

//User's AMI Grades
app.post("/cobraAMI", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM AMI_grades INNER JOIN umd ON umd.student_id = AMI_grades.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/cobraAMI");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

//User's SAMI
app.post("/cobraSAMI", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM SAMI_grades INNER JOIN umd ON umd.student_id = SAMI_grades.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

app.post("/cobraPAI", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM PAI_grades INNER JOIN umd ON PAI_grades.student_id = umd.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

app.post("/cobraRoom", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM rooming INNER JOIN umd ON rooming.student_id = umd.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

app.post("/cobraLunch", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM lunch_arrangement INNER JOIN umd ON lunch_arrangement.student_id = umd.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});

app.post("/cobraBirth", async (req,res) => {
  const { name } = req.body;
  const query = 'SELECT * FROM birthdays INNER JOIN umd ON birthdays.student_id = umd.student_id WHERE umd.name = $1';
  const values = [name];
  try{
    const result = await pool.query(query,values);
    console.log(result.rows);
    res.json(result.rows);
  }
  catch (error) {
    console.log("in catch block of server.js/userUMD");
    console.log(error);
    res.json({ success: false, message: 'Not Querying' });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));
