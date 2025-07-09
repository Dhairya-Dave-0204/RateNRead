/*
    This file handles and defines the routing for handeling the user library functions for multiple functions
*/

import express from "express";
import {
  handleAddToLibrary,
  handleGetUserLibrary,
  handleRemoveFromLibrary,
  handleUpdateLibraryEntry,
} from "../controllers/libraryController.js";

export const libraryRouter = express.Router();

// GET all books in user's library
libraryRouter.get("/", handleGetUserLibrary);

// POST a book to user's library
libraryRouter.post("/add", handleAddToLibrary);


// PUT (update) a library entry's rating/notes
libraryRouter.put("/:libraryId", handleUpdateLibraryEntry);

// DELETE a book from user's library
libraryRouter.delete("/:libraryId", handleRemoveFromLibrary);