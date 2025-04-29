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
    res.json({ success: false, message: 'Username or email already exists.' });
  }
});

app.post("/login", auth.login);

app.get("/users", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /users");
  const result = await pool.query("SELECT username, email, role FROM users");
  console.log(`GET /users rows: ${result.rows}`);
  res.json(result.rows);
});
// For UMD table
app.get("/umd", auth.ensureAdmin, async (req, res) => {
  // may not be pulling form data from json body right
  const { num_rows } = req.body;
  console.log("in GET /umd");
  const result = await pool.query("SELECT student_id, class_year, cadet_rank, phone_num, email_addr, name FROM UMD");
  console.log(`GET /umd rows: ${result.rows}`);
  res.json(result.rows);
});

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
  const { student_id, class_year, cadet_rank, phone_num, email_addr, name } = req.body;

  const query = 'INSERT INTO UMD (student_id, class_year, cadet_rank, phone_num, email_addr, name) VALUES ($1, $2, $3, $4, $5, $6)'; // Correct way to have a variable in an SQL statement?

  const values = [student_id, class_year, cadet_rank, phone_num, email_addr, name];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `info added` });
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Info could not be added' });
  }

});

app.listen(3000, () => console.log("Server running on port 3000"));
