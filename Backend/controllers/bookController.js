/*
    This file contains the logic to handle book-related requests.
    It includes fetching books with pagination, filtering, and sorting.
    A single endpoint is used for retrieving books based on various parameters by the use of query parameters.
*/

import dbPool from "../config/db.js";

export const getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      query = "",
      language = "all",
      sortBy = "recent",
    } = req.query;

    const offset = (page - 1) * limit;

    // Base SQL query
    let baseQuery = "SELECT * FROM books";
    let whereClauses = [];
    let values = [];

    // Search query
    if (query) {
      values.push(`%${query.toLowerCase()}%`);
      whereClauses.push(
        `(LOWER(title) LIKE $${values.length} OR
                EXISTS (
                    SELECT 1 FROM unset(authors) a WHERE LOWER(a) LIKE $${values.length}
                )
                )`
      );
    }

    // Language filter
    if (language != "all") {
      values.push(language);
      whereClauses.push(`language = $${values.length}`);
    }

    // Combining and making the where clauses
    if (whereClauses.length > 0) {
      baseQuery += " WHERE " + whereClauses.join(" AND ");
    }

    // Sorting
    switch (sortBy) {
      case "title":
        baseQuery += " ORDER BY title ASC";
        break;
      case "recent":
        baseQuery += "ORDER BY book_id DESC";
        break;
      default:
        baseQuery += " ORDER BY book_id ASC";
        break;
    }

    // Pagination
    values.push(limit);
    values.push(offset);
    baseQuery += ` LIMIT $${values.length - 1} OFFSET $${values.length}`

    // Final data fetching or executing the query
    const result = await dbPool.query(baseQuery, values);

    // Total count query for pagination in frontend
    let countQuery = "SELECT COUNT(*) FROM books"
    if (whereClauses.length > 0) {
        countQuery += " WHERE " + whereClauses.join(" AND ");
    }
    const countResult = await dbPool.query(countQuery, values.slice(0, values.length - 2));
    const totalCount = parseInt(countResult.rows[0].count, 10);

    res.send({
        success: true,
        data: result.rows,
        pagination: {
            total: totalCount,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            totalPages: Math.ceil(totalCount / limit),
        }
    })
  } catch (error) {
    console.error("Error fetching books:", error);
    res.send({
      success: false,
      message: "Unable to fetch books via bookController",
    });
  }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await dbPool.query("SELECT * FROM books WHERE book_id = $1", [id])

        if (result.rows.length === 0) {
            return res.send({
                success: false,
                message: "Book not found via bookController"
            });
        }

        res.send({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.send({ success: false, message: "Unable to fetch book by id via bookController" });
    }
}