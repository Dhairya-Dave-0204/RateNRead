import dbPool from "../config/db";

export const insertBooks = async (books) => {
  const values = books
    .map((book) => {
      const title = book.title.replace(/'/g, "''");
      const description = book.description.replace(/'/g, "''");
      const image = book.image.replace(/'/g, "''");
      const authorsArray = book.authors
        ? `ARRAY['${book.authors
            .map((a) => a.replace(/'/g, "''"))
            .join("','")}']`
        : "ARRAY[]::text[]";

      return `(
        '${book.google_id}',
        '${title}',
        ${authorsArray},
        '${description}',
        '${image}',
        '${book.isbn}',
        '${book.language}'
      )`;
    })
    .join(", ");

    const query = `
    INSERT INTO books (book_id, title, authors, description, image, isbn, language) 
    VALUES ${values} ON CONFLICT (book_id) DO NOTHING; 
    `;

    try {
        if (values) {
            await dbPool.query(query)
            console.log("Books inserted successfully via bookModel")
        }
    } catch (error) {
        console.error("Error entering books via bookModel", error);
    }
};
