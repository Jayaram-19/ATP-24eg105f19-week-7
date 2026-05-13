# BlogApp - Backend API

This is the backend server for the BlogApp, built using Node.js, Express, and MongoDB. It provides a robust API for managing users, authors, admins, and articles.

## Features

- **User Authentication:** Secure registration and login using BcryptJS for password hashing and JSON Web Tokens (JWT) for session management.
- **Role-Based Access Control:** Distinct APIs and logic for Users, Authors, and Admins.
- **Article Management:** Full CRUD operations for articles, specifically tailored for authors.
- **File Uploads:** Integrated with Cloudinary and Multer for secure image handling and storage.
- **Security:** CORS configuration, environment variable protection, and secure cookie handling.
- **Centralized Error Handling:** Robust middleware for consistent API error responses.

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Security:** JWT, BcryptJS, Cookie-Parser
- **File Management:** Cloudinary, Multer
- **Others:** Dotenv, CORS

## 📂 Project Structure

- `server.js`: The main entry point of the application.
- `APIs/`: Contains route handlers for Users, Authors, Admins, and Common authentication.
- `models/`: Mongoose schemas for Users and Articles.
- `middlewares/`: Custom middleware functions (e.g., Token verification).
- `config/`: Database and Cloudinary configuration.

##  Setup & Installation

1. **Clone the repository** (if not already done).
2. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Environment Variables:**
   Create a `.env` file in the `Backend` directory and add the following:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FRONTEND_URL=http://localhost:5173
   ```
5. **Run the server:**
   ```bash
   npm start
   ```

## API Endpoints

| Endpoint | Description | Access |
| :--- | :--- | :--- |
| `/auth` | Common login/registration logic | Public |
| `/user-api` | User-specific operations | Registered Users |
| `/author-api` | Article creation and management | Authors |
| `/admin-api` | Administrative controls | Admins |
