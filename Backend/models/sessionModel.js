import dbPool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Create a new session for the user
export async function createSession(userId) {
  try {
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // expires in 24 hours

    // Inserting session into the sessions table
    const query = `
      INSERT INTO user_sessions (user_id, session_token, expire, sess) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const sessData = JSON.stringify({ sessionToken });

    const values = [userId, sessionToken, expiresAt, sessData];

    const result = await dbPool.query(query, values);

    // Return the session object with session_token
    return result.rows[0];
  } catch (error) {
    console.log("Error creating a new session", error);
    throw error; // Re-throw the error
  }
}

// Deleting all existing sessions for a user (e.g., when re-login)
export async function deleteSessions(userId) {
  try {
    const query = `DELETE FROM user_sessions WHERE user_id = $1;`;
    const values = [userId];

    await dbPool.query(query, values);
  } catch (error) {
    console.log("Error deleting all sessions for a user", error);
  }
}

// Find a session token if not expired
export async function findSessionByToken(token) {
  try {
    const query = `SELECT * FROM user_sessions WHERE session_token = $1 AND expire > NOW();`;
    const values = [token];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding the session", error);
  }
}
