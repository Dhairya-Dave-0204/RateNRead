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

export const router = express.Router();

// GET all books in user's library
router.get("/", handleGetUserLibrary);

// POST a book to user's library
router.post("/", handleAddToLibrary);


// PUT (update) a library entry's rating/notes
router.put("/:libraryId", handleUpdateLibraryEntry);

// DELETE a book from user's library
router.delete("/:libraryId", handleRemoveFromLibrary);