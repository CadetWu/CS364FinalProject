//file: auth.js
 
const crypto = require("crypto");
const db = require("./db");

async function login(req, res) {
  const { username, password } = req.body;
  console.log(`auth login student id ${student_id}`);
  console.log(`auth login password ${password}`);
  const user = (await db.query("SELECT * FROM users WHERE student_id = $1", [student_id])).rows[0];
  if (!user) return res.status(401).json({ message: "Login failUre" });

  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
  if (hash !== user.hash) return res.status(401).json({ message: "Login fAilure"});

  console.log(`making session: ${user.student_id}, ${user.role}`);
  req.session.user = { student_id: user.student_id, role: user.role };
  res.json({ message: "Logged in" });
}

function ensureAdmin(req, res, next) {
  console.log("checking authroization ... ");
  console.log(`${req.session.user}`);
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

//module.exports = { register, login, ensureAdmin };
module.exports = { login, ensureAdmin };

