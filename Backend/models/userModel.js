/*
This file contains the ffunction related to the user of the project.
All functionality involving the user is defined here.
*/

import dbPool from "../config/db.js";
import { createSession, deleteSessions, findSessionByToken } from "./sessionModel.js"

// Insert new user to the database, (User Registration)
export const createUser = async (username, email, hashedPassword) => {
  try {
    // Create the user in the users table
    const result = await dbPool.query(
      "INSERT INTO users (username, email, pass) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // Get the new user's ID
    const newUser = result.rows[0];

    // Create a session for the new user
    const session = await createSession(newUser.id);

    // Ensure that session_token is added to the user object
    newUser.sid = session.sid
    newUser.session_token = session.session_token;
    newUser.sess = session.sess

    return newUser;  // Return the user along with the session token
  } catch (error) {
    console.log("Error creating new user", error);
    throw error;  // Rethrow the error after logging it
  }
};

// Find user by id
export const findUserById = async (id) => {
  try {
    const result = await dbPool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by id" + error);
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

// Create new user using sign-in with google
export const createUserFromGoogle = async (profile) => {
  const email = profile.emails[0].value;
  const username = profile.displayName;
  const hashedPassword = "Google Created";
  const googleId = profile.displayName;

  try {
    const result = await dbPool.query(
      "INSERT INTO users (username, email, pass, google) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, googleId]
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error creating user with GOOGLE" + error);
  }
};

// Find user by using Google ID
export const findUserByGoogleId = async (googleId) => {
  try {
    const result = await dbPool.query("SELECT * FROM users WHERE google = $1", [
      googleId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by using Google ID" + error);
  }
};
