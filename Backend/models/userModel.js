/*
This file contains the ffunction related to the user of the project.
All functionality involving the user is defined here.
*/

import dbPool from "../config/db.js";

// Insert new user to the database, (User Registration)
export const createUser = async (username, email, hashedPassword) => {
  try {
    const result = await dbPool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error creating new user" + error);
  }
};

// Find user by using email
export const findUserByEmail = async (email) => {
  try {
    const result = await dbPool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by MAIl" + error);
  }
};

// Find user by using username
export const findUserByUsername = async (username) => {
  try {
    const result = await dbPool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error finding the user by Username" + error);
  }
};
