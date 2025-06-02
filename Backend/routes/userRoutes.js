/*
    This file contains the routes for user-related operations.
    It includes routes for fetching user details, updating user information for simple profile updates
*/

import express from "express";
import dbPool from "../config/db.js";

export const userRouter = express.Router();

userRouter.get("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.send({
      success: false,
      message: "Unauthorized req from userRouter",
    });
  }

  try {
    const userId = req.user.id;

    const result = await dbPool.query(
      "SELECT username, email, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.send({
        success: false,
        message: "User not found from userRouter",
      });
    }
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.send({ success: false, message: "Server error from userRouter" });
  }
});

userRouter.put("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.send({
      success: false,
      message: "Unauthorized req from userRouter",
    });
  }

  const { username, email } = req.body;

  try {
    const userId = req.user.id;

    const result = await dbPool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
      [username, email, userId]
    );

    if (result.rows.length === 0) {
      return res.send({
        success: false,
        message: "User not found from userRouter",
      });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.send({ success: false, message: "Server error from userRouter" });
  }
});
