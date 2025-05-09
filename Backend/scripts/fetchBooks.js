/*
    This file contains a function that takes the fetched books from the api and inserts it into the database
*/

import { fetchBooksData } from "../utils/fetchBooksApi";
import { insertBooks } from "../models/bookModel";

const fetchAndInserBooks = async () => {
  const queries = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let query of queries) {
    let startIndex = 0;
    let fetchedBooks = [];

    while (fetchedBooks.length < 40) {
      const books = await fetchBooksData(query, startIndex);
      if (!books || books.length === 0) break;

      fetchedBooks = [...fetchedBooks, ...books];
      startIndex += 40;
    }

    if (fetchedBooks.length > 0) {
      await insertBooks(fetchedBooks);
      console.log(
        `Enterd 40 books till ${startIndex} via fetchBook for ${query}`
      );
    }
  }
};

fetchAndInsertBooks()
  .then(() => {
    console.log("Finished inserting books via fetchBook");
  })
  .catch((error) => {
    console.error("Error during fetching and inserting books via fetchBook:", error);
  });
