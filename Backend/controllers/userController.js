/*
    This file contains the code of all the functionality to handle user management
*/
import bcrypt from "bcrypt";
import passport from "passport";
import { createUser, findUserByEmail } from "../models/userModel.js";

// Function to register new user to the website (Handle manual registration)
export async function handleRegister(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send({
      success: false,
      message: "Please fill in all fields via userController",
    });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.send({
        success: false,
        message: "User already exists via userController",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    // Auto-login after registration
    req.login(newUser, (err) => {
      if (err) {
        return res.send({
          success: false,
          message: "Login after registration failed via userController",
        });
      }
      return res.send({
        success: true,
        message: "Registration successful via userController",
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.send({
      success: false,
      message: "Server error during registration via userController",
    });
  }
}

// Function to login existing user (Handle manual login using passport local strategy)
export function handleLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.send({
        success: false,
        message: info.message + "via userController",
      });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.send({
        success: true,
        message: "Login successful via userController",
        user,
      });
    });
  })(req, res, next);
}

// Function to logout
export function handleLogout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.send({ success: false, message: "Logout failed" });
    }
    res.redirect("/");
  });
}

// Function to check authentication status (check active session)
export function handleSessionCheck(req, res) {
  if (req.isAuthenticated()) {
    res.send({ success: true, user: req.user + "via userController" });
  } else {
    res.send({
      success: false,
      message: "No active session via userController",
    });
  }
}
