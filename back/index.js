import express from "express";
import mysql from "mysql2";
import dotenv from 'dotenv'
// import

dotenv.config();
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME, // Default MySQL username in XAMPP
  password: process.env.MYSQL_PASSWORD, // Default password for MySQL in XAMPP
  database:process.env.MYSQL_DATABASE,
});





// Route to create a new user
app.post("/users", (req, res) => {
  const { name, email, username, img, password } = req.body;
  const query =
    "INSERT INTO users (name, email, username, img, password) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query,
    [name, email, username, img, password],
    (err, results) => {
      if (err) {
        console.error("Error creating user: ", err);
        return res.status(500).json({ error: "Error creating user" });
      }
      res
        .status(201)
        .json({
          message: "User created successfully",
          userId: results.insertId,
        });
    }
  );
});

// Route to create a new post
app.post("/posts", (req, res) => {
  const { title, description, author, image, category } = req.body;
  const query =
    "INSERT INTO posts (title, description, author, image, category) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query,
    [title, description, author, image, category],
    (err, results) => {
      if (err) {
        console.error("Error creating post: ", err);
        return res.status(500).json({ error: "Error creating post" });
      }
      res
        .status(201)
        .json({
          message: "Post created successfully",
          postId: results.insertId,
        });
    }
  );
});

// Route to fetch posts along with user details
app.get("/posts", (req, res) => {
  const query = `
    SELECT posts.id, posts.title, posts.date, posts.description, posts.image, posts.category, 
           users.name AS author_name, users.username AS author_username
    FROM posts
    JOIN users ON posts.author = users.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts: ", err);
      return res.status(500).json({ error: "Error fetching posts" });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
