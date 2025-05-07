/*
    This file contains the code of all the functionality to handle user management
*/
import bcrypt from "bcrypt";
import passport from "passport";
import { createUser, findUserByEmail } from "../models/userModel";

// Function to register new user to the website
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send({
      success: false,
      message: "Missing valuses via userController",
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

    req.login(newUser, (error) => {
      if (error) {
        return res.send({
          success: true,
          message: "Error logging in after registration via userController",
        });
      }
      return res.send({ success: true, message: "Registration successful" });
    });
  } catch (error) {
    console.log("Error creating a user via userController" + error);
    res.send({
      success: false,
      message: "Registration failed via userController",
    });
  }
};

// Function to login existing user
export const loginUser = async (req, res, cb) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return cb(error);
    if (!user)
      return res.send({
        success: true,
        message: "Invalid credentials for login via userController",
      });

    req.login(user, (error) => {
      if (error) return cb(error);

      return res.send({ success: true, message: "Login successful", user });
    });
  });
  req, res, cb;
};

// Function to logout
const logoutUser = async (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log("Error logging out via userController" + error);
      return res.send({
        success: false,
        message: "Logout failed via userController",
      });
    }
    res.redirect("/");
  });
};

// Function to check authentication status
export const checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.send({
      success: true,
      message: "Session active via userController",
      user: req.user,
    });
  }
  return res.send({
    success: false,
    message: "No active session via userController",
  });
};
