# My Personal Blog App

## Overview

This web application is a **full-stack** platform built with **React** (frontend) and **Node.js** (backend) for managing blog posts, user authentication, and API interaction. The frontend is built using **React**, **React Router**, **React Query**, **Axios**, and **Tailwind CSS**. The backend is built with **Node.js** using the **Express** framework, with **MySQL** for the database and **Multer** for handling file uploads.

The app provides features like user authentication, blog CRUD operations, dynamic UI updates, and responsiveness for mobile devices. 

## Features

### Frontend
- **Responsive Navbar**: Changes background color when scrolled, includes a hamburger menu for small devices.
- **Dynamic Blog Listing**: Displays blog posts dynamically with pagination and sorting.
- **Authentication**: Users can log in, log out, and view protected routes. User authentication is stored using cookies.
- **Blog CRUD Operations**: Users can create, edit, and delete blog posts.
- **File Uploads**: Supports uploading images with **Multer** on the backend.
- **Responsive Design**: Optimized for desktop and mobile views with Tailwind CSS.
- **Dynamic Data Fetching**: Utilizes **React Query** to fetch and cache data efficiently.
  
### Backend
- **Express API**: Backend RESTful API using Express.js.
- **MySQL Database**: Data is stored in MySQL for scalability and reliability.
- **Authentication**: JWT-based user authentication with token storage in cookies.
- **File Upload Handling**: Multer is used for handling file uploads, enabling users to upload images to blog posts.
- **CORS**: CORS is enabled to allow cross-origin requests between the frontend and backend.
- **API Routes**: Exposes routes for blog CRUD operations and user authentication.

## Technologies Used

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for navigating between pages.
- **React Query**: Fetches, caches, and synchronizes data.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI design.
- **Axios**: Promise-based HTTP client for making API requests.
- **Cookies**: Handles authentication state and user session management.

### Backend:
- **Node.js**: JavaScript runtime for the server-side.
- **Express.js**: Fast, unopinionated web framework for building REST APIs.
- **MySQL**: Relational database management system.
- **Multer**: Middleware for handling `multipart/form-data`, primarily for file uploads.
- **CORS**: Middleware to enable cross-origin requests.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/haileamlakwalelige/react-and-node-js-blog
cd react-and-node-js-blog
```

### 2. Install Frontend Dependencies

In the frontend folder:

```bash
npm install
```

### 3. Install Backend Dependencies

In the backend folder:

```bash
npm install
```

### 4. Setup Environment Variables

Create a `.env` file in both the frontend and backend directories. Example `.env` for the backend:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=your_db
PORT=5000
JWT_SECRET=yoursecretkey
```

For the frontend, configure API URLs to point to the backend in your environment setup.

### 5. Run the Application

To run the backend:

```bash
npm start
```

To run the frontend:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:5173), and the backend will run at [http://localhost:3000](http://localhost:3000).

## API Routes

### 1. **User Authentication**
- **POST /auth/login**: Logs in a user and returns a JWT token.
- **POST /auth/logout**: Logs out a user by clearing the authentication cookie.
- **GET /auth/status**: Returns the current login status of the user.

### 2. **Blog Routes**
- **GET /blogs**: Fetches a list of all blogs.
- **GET /blogs/:id**: Fetches a specific blog by ID.
- **POST /blogs**: Creates a new blog post (supports image upload).
- **PUT /blogs/:id**: Updates a specific blog post by ID.
- **DELETE /blogs/:id**: Deletes a specific blog post by ID.

### 3. **File Upload**
- **POST /upload**: Handles image uploads (Multer middleware).


## Authentication

- **JWT Authentication**: After a user logs in, a JWT token is sent and stored in cookies to maintain user sessions.
- **Cookie Management**: Cookies are used to persist authentication status between page reloads and sessions.

## File Upload

- **Multer** is used in the backend to handle `multipart/form-data` for uploading images. Images are stored on the server and can be linked to blog posts.

## Testing and Debugging

### 1. **Frontend**:
- Ensure API endpoints are correctly connected and data is fetched properly.
- Use React Query to manage API request caching.

### 2. **Backend**:
- Use Postman or another API testing tool to test the routes for blog and authentication management.
- Ensure that Multer is correctly handling file uploads.

## Contribution Guidelines

Feel free to fork and make changes! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your changes to the branch
5. Create a pull request for review

---

This README should help you understand the overall architecture of the full-stack application and guide you through setting up the project.
