import express from "express";
import { getBooks, getBookById } from "../controllers/bookController.js";

export const bookRouter = express.Router();

// Route to get all books with optional query parameters for pagination, filtering, and sorting
// Endpoint: GET /api/books
bookRouter.get("/", getBooks);

// Route to get a single book by its ID
// Endpoint: GET /api/books/:id
bookRouter.get("/:id", getBookById);