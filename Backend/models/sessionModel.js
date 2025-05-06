import dbPool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Create a new session for user
export async function createSession(userId) {
  try {
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // expires in 24 hours

    const query = `INSERT INTO (user_id, sessionToken, expires_at) sessions VALUES ($1, $2, $3) RETURNING *;`;
    const values = [userId, sessionToken, expiresAt];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("Error creating a new session" + error);
  }
}

// Deleting all existing sessions for a user (E.g when re-login)
export async function deleteSessions(userId) {
    try {
        const query = `DELETE FROM sessions WHERE user_id = $1;`;
        const values = [userId];

        await dbPool.query(query, values);
    } catch (error) {
        console.log("Error deleting all sessions for a user" + error);
    }
}

// Find a session token if not expired
export async function findSessionByToken (token) {
    try {
        const query = `SELECT * FROM sessions WHERE session_token = $1 AND expires_at > NOW();`;
        const values = [token];

        const result = await dbPool.query(query,values)
        return result.rows[0];
    } catch (error) {
        console.log("Error finding the session" + error)        
    }
}