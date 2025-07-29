import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';
const { Pool } = pkg;

// Replace with your actual Neon connection string
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_r3zVf9nauhqU@ep-misty-moon-a7qv1ulx-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

const insertBook = async (book) => {
  const query = `
    INSERT INTO books (book_id, title, authors, description, image, isbn, language)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (book_id) DO NOTHING;
  `;

  try {
    let authorsArray;

    // Handle and clean malformed authors field
    const authorsRaw = book.authors.trim();

    if (authorsRaw.startsWith("[")) {
      // Replace single quotes with double quotes to form valid JSON
      const fixed = authorsRaw.replace(/'/g, '"');
      authorsArray = JSON.parse(fixed);
    } else {
      // Fallback: wrap single author in an array
      authorsArray = [authorsRaw];
    }

    await pool.query(query, [
      book.book_id,
      book.title,
      authorsArray,
      book.description || null,
      book.image || null,
      book.isbn || null,
      book.language || null,
    ]);
  } catch (err) {
    console.error('Insert error:', book.book_id, err.message);
    console.error('Malformed authors:', book.authors); // Debugging tip
  }
};

const processCSV = async () => {
  const results = [];

  fs.createReadStream('./booksdata_cleaned.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(`Total books to insert: ${results.length}`);
      for (const book of results) {
        await insertBook(book);
      }
      console.log('Data import complete.');
      await pool.end();
    });
};

processCSV();
