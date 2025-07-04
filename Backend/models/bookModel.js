/*
    This file contains the function to enter the books data into the database.
    This logic is implemented only once throughout the project in the initial phase to store the books data
    in the database to avoid multiple API calls for books data. This is viable only for small-scale projects and
    a bit static book data.
*/

import dbPool from "../config/db.js";

export const insertBooks = async (books) => {
  if (!Array.isArray(books) || books.length === 0) {
    console.log("No books to insert.");
    return;
  }

  const values = books
    .map((book) => {
      const title = (book.title || "").replace(/'/g, "''");
      const description = (book.description || "").replace(/'/g, "''");
      const image = (book.image || "").replace(/'/g, "''");
      const isbn = (book.isbn || "").replace(/'/g, "''");
      const language = (book.language || "").replace(/'/g, "''");
      const google_id = (book.google_id || "").replace(/'/g, "''");

      const authorsArray =
        Array.isArray(book.authors) && book.authors.length > 0
          ? `ARRAY['${book.authors.map((a) => (a || "").replace(/'/g, "''")).join("','")}']`
          : "ARRAY[]::text[]";

      return `(
        '${google_id}',
        '${title}',
        ${authorsArray},
        '${description}',
        '${image}',
        '${isbn}',
        '${language}'
      )`;
    })
    .join(", ");

  const query = `
    INSERT INTO books (book_id, title, authors, description, image, isbn, language)
    VALUES ${values}
    ON CONFLICT (book_id) DO NOTHING;
  `;

  try {
    console.log("Inserting books...");
    await dbPool.query(query);
    console.log("Books inserted successfully via bookModel");
  } catch (error) {
    console.error("❌ Error entering books via bookModel:", error);
  }
};
