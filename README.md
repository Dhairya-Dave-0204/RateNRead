# 📚 RateNRead - Book Tracking App

**RateNRead** is a full-stack book tracking application built using the **PERN Stack (PostgreSQL, Express.js, React, Node.js)**. The platform allows users to browse and manage a collection of over 900 curated books, save favorites to their personal library, rate them, add personal notes, and more – all with smooth UX and persistent session handling.

🚀 **Live Site**: [https://rate-n-read.netlify.app](https://rate-n-read.netlify.app)  
🔗 **Backend API**: [https://rate-n-read-backend.onrender.com](https://rate-n-read-backend.onrender.com)

---

## ✨ Features

- 🔍 Browse 900+ curated books
- 💾 Add books to your personal library
- ⭐ Rate books and write personal notes
- 🔄 Filter, sort, and paginate books
- 🔐 Secure login with Google & Email (Passport.js)
- 📦 PostgreSQL session management
- 🎨 Responsive UI with Tailwind CSS
- 🎞️ Smooth animations via Framer Motion
- ☁️ Fully deployed on Netlify (frontend) & Render (backend)

---

## 🧱 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios

### 🔹 Backend
- Node.js (ES modules)
- Express.js
- PostgreSQL
- Passport.js (Local + Google OAuth)
- connect-pg-simple
- dotenv, bcrypt, cors

---

## 🗃️ Database Schema Overview

### `books`
| Column     | Type     | Description               |
|------------|----------|---------------------------|
| book_id    | TEXT     | Primary Key               |
| title      | TEXT     | Book title                |
| authors    | TEXT[]   | Array of authors          |
| description| TEXT     | Book summary              |
| image      | TEXT     | Cover image URL           |
| isbn       | TEXT     | ISBN code                 |
| language   | TEXT     | Language code             |

### `users`
| Column     | Type     | Description               |
|------------|----------|---------------------------|
| user_id    | SERIAL   | Primary Key               |
| name       | TEXT     | User name                 |
| email      | TEXT     | Unique email              |
| password   | TEXT     | Hashed password           |
| provider   | TEXT     | 'local' or 'google'       |

### `user_library`
| Column     | Type     | Description               |
|------------|----------|---------------------------|
| id         | SERIAL   | Primary Key               |
| user_id    | INT      | Foreign key to `users`    |
| book_id    | TEXT     | Foreign key to `books`    |
| rating     | INT      | Star rating (0–5)         |
| note       | TEXT     | User note on the book     |

---

## 📦 Folder Structure
```bash
RateNRead/
├── client/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── server/                  # Express Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
│
├── .env                     # Environment Variables
├── README.md
└── package.json
   ```

## ⚙️ Local Development Setup

1. Clone the repository:
   ```bash
    git clone https://github.com/Dhairya-Dave-0204/RateNRead
   ```
   
2. Navigate to the project directory:
   ```bash
   cd RateNRead
   ```
   
3. Install dependencies for both frontend and backend:
   ```bash
   # Frontend dependencies
   cd ../Frontend
   npm install

   # Backend dependencies
   cd ../Backend
   npm install
   ```

**Environment Variables**
Create a .env file in the Backend directory and add the following variables:

  ```bash
  DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
  SESSION_SECRET=your-session-secret
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  GOOGLE_CALLBACK_URL=https://yourdomain.com/auth/google/callback
  FRONTEND_URL=https://rate-n-read.netlify.app
  PORT=5000
```

Create a .env file in the Frontend directory and add the following variables:
```bash
  VITE_BACKEND_URL="http://localhost:3000"
  VITE_GOOGLE_CLIENT_ID=your-google-client-id
  VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Usage
1. Start the backend server:
  ```bash
    cd Backend
    npm run start
  ``` 
2. Start the frontend development server:
  ```bash
    cd Frontend
    npm run dev
  ```  

