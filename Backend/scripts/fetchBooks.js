/*
    This file contains a function that takes the fetched books from the API and inserts them into the database.
*/

import "dotenv/config";
import { insertBooks } from "../models/bookModel.js";
import { fetchBooksData } from "../utils/fetchBooksApi.js";

const fetchAndInsertBooks = async () => {
  const queries = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  for (const query of queries) {
    let startIndex = 0;
    let fetchedBooks = [];

    console.log(`📘 Fetching books for query: "${query}"`);

    while (fetchedBooks.length < 40) {
      try {
        const books = await fetchBooksData(query, startIndex);
        if (!books || books.length === 0) {
          console.log(`🔚 No more books for "${query}" at startIndex ${startIndex}`);
          break;
        }

        fetchedBooks = [...fetchedBooks, ...books];
        startIndex += 40;
      } catch (error) {
        console.error(`❌ Error fetching books for query "${query}" at index ${startIndex}:`, error);
        break;
      }
    }

    if (fetchedBooks.length > 0) {
      try {
        await insertBooks(fetchedBooks);
        console.log(`✅ Inserted ${fetchedBooks.length} books for query "${query}"`);
      } catch (error) {
        console.error(`❌ Error inserting books for "${query}":`, error);
      }
    } else {
      console.log(`⚠️ No books fetched for "${query}"`);
    }
  }
};

fetchAndInsertBooks()
  .then(() => {
    console.log("🎉 Finished inserting books via fetchAndInsertBooks.js");
  })
  .catch((error) => {
    console.error("❌ Fatal error in fetchAndInsertBooks:", error);
  });
