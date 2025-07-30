/*
This the file where the server setup is done.
All the core functionality of the server is implemented here.
*/

import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session"; // used to establish session using express
import connectPgSimple from "connect-pg-simple"; // used to manage sessions in postgres database
import dbPool from "./config/db.js";
import passport from "passport";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { bookRouter } from "./routes/booksRoutes.js";
import { libraryRouter } from "./routes/libraryRoutes.js";
import "./config/passport.js";
//import { insertBooks } from "./models/bookModel.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

const PgSession = connectPgSimple(session); // decalration of the session management\

const allowedOrigins = [
  "http://localhost:5173",
  "https://rate-n-read.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {  
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup of the session for the app
app.use(
  session({
    store: new PgSession({
      pool: dbPool,
      tableName: "session",
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// setup of the passport for authentication session
app.use(passport.initialize());
app.use(passport.session());

// setup for the usage of ROUTES
app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/library", libraryRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
