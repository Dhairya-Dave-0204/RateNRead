import { useState } from "react";
import { StarRating } from "../component_index"

const BookModal = ({
  book,
  onClose,
  onRate,
  onRemove,
  onSaveNotes,
}) => {
  const [editingNotes, setEditingNotes] = useState(book.notes || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-800 cursor-pointer top-3 right-3"
        >
          ✕
        </button>
        <div className="flex flex-col gap-6 sm:flex-row">
          <img
            src={book.image}
            alt={book.title}
            className="object-cover w-40 h-56 rounded"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-bold text-blue-900">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500">{book.description}</p>
            <p className="text-sm">ISBN: {book.isbn}</p>
            <p className="text-sm">Language: {book.language}</p>
            <p className="text-sm">
              Added on: {new Date(book.dateAdded).toLocaleDateString()}
            </p>

            <div className="mt-2">
              <h4 className="font-medium text-blue-800">Your Rating</h4>
              <StarRating
                rating={book.rating}
                onRate={(id, rate) => onRate(book.id, rate)}
                bookId={book.id}
              />
            </div>

            <div className="mt-4">
              <h4 className="mb-1 font-medium text-blue-800">Your Notes</h4>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                rows={5}
                className="w-full p-2 border rounded-md"
                placeholder="Write your thoughts here..."
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onSaveNotes(book.id, editingNotes)}
                  className="px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500"
                >
                  Save Notes
                </button>
                <button
                  onClick={() => setEditingNotes(book.notes || "")}
                  className="px-4 py-2 text-gray-800 transition-colors duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Cancel Edit
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => onRemove(book.id)}
                className="px-4 py-2 text-red-600 border border-red-500 rounded-md cursor-pointer hover:bg-red-50"
              >
                Remove from Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
