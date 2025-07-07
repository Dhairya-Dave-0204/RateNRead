import React from "react";

const LibraryBookCard = ({ book, onClick }) => (
  <div
    className="p-4 transition bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md"
    onClick={onClick}
  >
    <img
      src={book.image}
      alt={book.title}
      className="object-cover w-full h-48 rounded"
    />
    <h3 className="mt-2 text-lg font-semibold text-blue-900">
      {book.title}
    </h3>
    <p className="text-sm text-gray-600">by {book.author}</p>
  </div>
);

export default LibraryBookCard;
