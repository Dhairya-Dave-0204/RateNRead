/*
This the file where the server setup is done.
All the core functionality of the server is implemented here.
*/

import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session"; // used to establish session using express
import connectPgSimple from "connect-pg-simple"; // used to manage sessions in postgres database
import dbPool from "./config/db.js";
import passport from "passport";
import authRouter from "./routes/authRoutes.js"
import "./config/passport.js  "

const app = express();
const port = process.env.PORT || 3000;

const PgSession = connectPgSimple(session); // decalration of the session management

app.use(cors({ credentials: true }));
app.use(express.json());

// setup of the session for the app
app.use(
  session({
    store: new PgSession({
      pool: dbPool,
      tableName: "sessions",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    secret: process.env.SESSION_SSECRET,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// setup ffor the usage of ROUTES
app.use("/api", authRouter);

// setup of the passport for authentication session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
