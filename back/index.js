import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err.message);
    process.exit(1); // Stop the server if the database connection fails
  }
  console.log("✅ Connected to MySQL database!");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [name, email, hashedPassword];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully", userId: data.insertId });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
