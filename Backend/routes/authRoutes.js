/*
  This file manages all the routing done for the user management
*/

import express from "express";
import passport from "passport";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleSessionCheck,
} from "../controllers/userController.js";

export const authRouter = express.Router();

// ===== LOCAL AUTH ROUTES ===== //
authRouter.post("/auth/register", handleRegister);
authRouter.post("/auth/login", handleLogin);
authRouter.get("/auth/logout", handleLogout);
authRouter.get("/auth/check", handleSessionCheck);

// ===== Google AUTH ROUTES ===== //
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:5173/profile",
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);
