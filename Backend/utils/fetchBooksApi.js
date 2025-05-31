/*
    This file contains the function to fetch the books from the Google books api and extract the relevant data
*/

import axios from "axios";

const fields =
  "items(id,volumeInfo(title,authors,description,imageLinks,industryIdentifiers,language))";

export const fetchBooksData = async (query, startIndex = 0) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: query, // The search query (e.g., A to Z)
          startIndex: startIndex, // Pagination
          maxResults: 40, // Fetch 40 books per request
          fields: fields, // Only the required fields
          key: process.env.GOOGLE_API_KEY, // Your API key
        },
      }
    );

    // Extract the relevant book data
    const books = response.data.items.map((item) => ({
      google_id: item.id,
      title: item.volumeInfo.title || "No Title",
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || "No Description",
      image: item.volumeInfo.imageLinks?.smallThumbnail || null,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || null,
      language: item.volumeInfo.language || "en",
    }));

    return books;
  } catch (error) {
    console.error("Error fetching books data via fetchBooksApi", error);
  }
};
