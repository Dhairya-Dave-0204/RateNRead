/*
    This file contains the logic to handle library related requests.
    It includes all sort of user library related requests.
*/

import {
  addToLibrary,
  getUserLibrary,
  updateLibraryEntry,
  deleteLibraryEntry,
} from "../models/libraryModel.js";

// Add a book to user library
export const handleAddToLibrary = async (req, res) => {
  const userId = req.user?.id;
  const { bookId } = req.body;

  if (!userId || bookId) {
    return res.send({
      success: false,
      message: `Error via libController. Not found ${userId} or ${bookId}`,
    });
  }

  try {
    const entry = await addToLibrary(userId, bookId);
    res.send({
      success: true,
      message: "Book added successfully via libController",
      entry,
    });
  } catch (error) {
    console.log("Error adding to library via libController" + error);
    res.send({
      success: false,
      message: "Error adding book via libContoller catch",
    });
  }
};

// Get all books in the user library
export const handleGetUserLibrary = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.send({
      success: false,
      message: "User id not found via libContoller",
    });
  }

  try {
    const books = await getUserLibrary(userId);
    res.send({ success: true, meesage: "All books fetched", books });
  } catch (error) {
    console.log("Error fetching the user library via libController" + error);
    res.send({
      success: false,
      message: "Error fetching the user library via libContoller catch",
    });
  }
};

// update notes and rating of a book in library
export const handleUpdateLibraryEntry = async (req, res) => {
  const libraryId = req.params;
  const { rating, notes } = req.body;

  if (!libraryId) {
    return res.send({
      success: false,
      message: "Library id not found via libController",
    });
  }

  if (!rating && !notes) {
    return res.send({
      success: false,
      message: "No rating or notes found via libController",
    });
  }

  try {
    const updated = await updateLibraryEntry(libraryId, rating, notes);
    res.send({ success: true, message: "Updated successfully", updated });
  } catch (error) {
    console.log("Error updating user library via libController" + error);
    res.send({
      success: false,
      message: "Errorupdating user library via libContoller catch",
    });
  }
};

// remove a book from library
export const handleRemoveFromLibrary = async (req, res) => {
  const { libraryId } = req.params;

  if (!libraryId) {
    return res.send({
      success: false,
      message: "Library id not found to delete via libController",
    });
  }

  try {
    await deleteLibraryEntry(libraryId);
    res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error removing from user library via libController" + error);
    res.send({
      success: false,
      message: "Error removing from user library via libContoller catch",
    });
  }
};
