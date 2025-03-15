import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


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


// Set up multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path to store uploaded files (ensure the 'uploads' folder exists)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp and original extension
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});


// user sections
// app.post("/api/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)";
//     const values = [name, email, hashedPassword];

//     db.query(q, values, (err, data) => {
//       if (err) {
//         console.error("Database Error:", err.message);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.status(201).json({ message: "User registered successfully", userId: data.insertId });
//     });
//   } catch (error) {
//     console.error("Server Error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Retrieve user from the database
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (err, data) => {
      if (err) {
        console.error("Database Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      if (data.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = data[0];

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token (optional)
      const token = jwt.sign({ userId: user.id }, "personal_blog_app_by_haileopia", { expiresIn: "7d" });

      res.status(200).json({ message: "User logged in successfully", token });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  jwt.verify(token, "personal_blog_app_by_haileopia", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token!" });
    }

    if (decoded.id !== parseInt(userId)) {
      return res.status(403).json({ message: "You can only delete your own account!" });
    }

    const query = "DELETE FROM users WHERE `id` = ?";
    db.query(query, [userId], (err, data) => {
      if (err) return res.status(500).json({ message: "Error deleting your user!" });
      return res.status(200).json({ message: "User deleted successfully!" });
    });
  });
});



// post sections

app.get('/api/posts', (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Error fetching posts" });
    return res.status(200).json({ message: "Fetched all posts", data });
  });
});

app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const query = "SELECT * from posts WHERE `id`=?";

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(401).json({ message: "Can't fetch or find this post!" });
    return res.status(201).json({ message: "This is you single post", data })
  })
})


app.post('/api/posts', upload.single('image'), (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    jwt.verify(token, "personal_blog_app_by_haileopia", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token!" });
      }

      const userId = decoded.id; // Extract user ID from token
      const { title, category, type, date, description } = req.body;
      const image = req.file ? req.file.filename : null; // Get the image filename

      // Validate input fields
      if (!title || !category || !type || !image || !date || !description) {
        return res.status(400).json({ error: "All fields are required!" });
      }

      const q = "INSERT INTO posts (`user_id`, `title`, `category`, `type`, `image`, `date`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [userId, title, category, type, image, date, description];

      db.query(q, values, (err, result) => {
        if (err) {
          console.error("Database Error:", err.message);
          return res.status(500).json({ error: "Error posting your content, please try again later!" });
        }

        const insertedId = result.insertId;
        const fetchQuery = "SELECT * FROM posts WHERE id = ?";

        db.query(fetchQuery, [insertedId], (err, data) => {
          if (err) {
            console.error("Database Fetch Error:", err.message);
            return res.status(500).json({ error: "Error retrieving the created post!" });
          }
          return res.status(201).json({ message: "Your post was created successfully!", post: data[0] });
        });
      });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});




app.put('/api/posts/:id', upload.single('image'), (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    jwt.verify(token, "personal_blog_app_by_haileopia", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token!" });
      }

      const userId = decoded.id; // Extract user ID from token
      const postId = req.params.id;
      const updates = req.body;
      const image = req.file ? req.file.filename : null;

      if (Object.keys(updates).length === 0 && !image) {
        return res.status(400).json({ error: "No fields provided for update!" });
      }

      // Fetch the existing post
      const fetchQuery = "SELECT * FROM posts WHERE id = ?";
      db.query(fetchQuery, [postId], (err, data) => {
        if (err) {
          console.error("Database Fetch Error:", err.message);
          return res.status(500).json({ error: "Error retrieving the existing post!" });
        }

        if (data.length === 0) {
          return res.status(404).json({ error: "Post not found" });
        }

        const existingPost = data[0];

        // Check if the logged-in user is the owner of the post
        if (existingPost.user_id !== userId) {
          return res.status(403).json({ error: "Forbidden! You are not allowed to update this post." });
        }

        // Create a new object with only updated fields
        const updatedFields = {};
        Object.keys(updates).forEach((key) => {
          if (updates[key] !== "") updatedFields[key] = updates[key];
        });
        if (image) updatedFields.image = image;

        // Ensure there's something to update
        if (Object.keys(updatedFields).length === 0) {
          return res.status(400).json({ error: "No valid fields to update!" });
        }

        // Dynamically generate the SQL query
        const fields = Object.keys(updatedFields)
          .map((key) => `\`${key}\` = ?`)
          .join(", ");
        const values = [...Object.values(updatedFields), postId];

        const updateQuery = `UPDATE posts SET ${fields} WHERE id = ?`;

        // Execute the update query
        db.query(updateQuery, values, (err, result) => {
          if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: "Error updating the post" });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found" });
          }

          // Fetch and return the updated post
          db.query(fetchQuery, [postId], (err, updatedData) => {
            if (err) {
              console.error("Database Fetch Error:", err.message);
              return res.status(500).json({ error: "Error retrieving the updated post!" });
            }
            return res.status(200).json({ message: "Post updated successfully!", post: updatedData[0] });
          });
        });
      });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.delete('/api/posts/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    jwt.verify(token, "personal_blog_app_by_haileopia", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token!" });
      }

      const userId = decoded.id; // Extract user ID from token
      const postId = req.params.id;

      // Fetch the existing post
      const fetchQuery = "SELECT * FROM posts WHERE id = ?";
      db.query(fetchQuery, [postId], (err, data) => {
        if (err) {
          console.error("Database Fetch Error:", err.message);
          return res.status(500).json({ message: "Error retrieving the post!" });
        }

        if (data.length === 0) {
          return res.status(404).json({ message: "Post not found!" });
        }

        const existingPost = data[0];

        // Check if the logged-in user is the owner of the post
        if (existingPost.user_id !== userId) {
          return res.status(403).json({ message: "Forbidden! You are not allowed to delete this post." });
        }

        // Delete the post if the user is authorized
        const deleteQuery = "DELETE FROM posts WHERE id = ?";
        db.query(deleteQuery, [postId], (err, result) => {
          if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ message: "Error deleting your post!" });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found!" });
          }

          return res.status(200).json({ message: "Post deleted successfully!" });
        });
      });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
