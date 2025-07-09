/*
This file contains the function related to the user library of the project.
All functionality involving the use libraryr is defined here.
*/

import dbPool from "../config/db";

// Add a book to the user library
export const addToLibrary = async (userId, bookId) => {
  try {
    const existing = await dbPool.query(
      `SELECT * FROM user_library WHERE user_id = $1 AND book_id = $2`,
      [userId, bookId]
    );

    if (existing.rows.length > 0) {
      console.log("The book is already in your library via libraryModel");
      return;
    }

    const result = await dbPool.query(
      `INSERT INTO user_library (user_id, book_id) VALUES ($1, $2) RETURNING *`,
      [userId, bookId]
    );

    return result.rows[0];
  } catch (error) {
    console.log("Error adding book via library model" + error);
  }
};

// Get all books in the user library (joined with book info)
export const getUserLibrary = async () => {
  try {
    const result = await dbPool.query(
      `SELECT ul.id AS library_id, ul.rating, ul.notes, ul.created_at, b.book_id b.title, b.authors, b.title, b.authors, b.description, b.isbn, b.language, b.image
      FROM user_library ul
      join books on ul.book_id = b.book_id
      WHERE ul.user_id = $1
      ORDER BY ul.created_at DESC`,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.log("Error getting user library via library model" + error);
  }
};

// Update the rating and/or notes for books in the user library
export const updateLibraryEntry = async (libraryId, rating, notes) => {
  try {
    const result = await dbPool.query(
      `UPDATE user_library 
            SET rating = $1, notes = $2
            WHERE id = $3 RETURNING *`,
      [rating, notes, libraryId]
    );

    return result.rows[0];  
  } catch (error) {
    console.log("Error updating library entry via library model" + error);
  }
};

export const deleteLibraryEntry = async (libraryId) => {
  try {
    await dbPool.query(`DELETE FROM user_library WHERE ID = $1`, [libraryId]);
  } catch (error) {
    console.log(
      "Error deleting the book from the user library via library model" + error
    );
  }
};
