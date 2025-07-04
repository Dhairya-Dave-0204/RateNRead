function BookDetail({ book, onClose, onAddToLibrary }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg text-primary overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 cursor-pointer hover:text-gray-700 top-4 right-4"
        >
          <i className="text-2xl ri-close-line"></i>
        </button>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Book image */}
          <img
            src={book.image}
            alt={book.title}
            className="w-full max-w-[300px] mx-auto md:mx-0 rounded-md object-cover shadow-md"
          />

          {/* Book details */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="mt-5 mb-4 text-2xl font-bold text-main-border">
                {book.title}
              </h2>
              <p className="mb-2 text-gray-700">
                <strong>Author:</strong> {book.authors.join(", ")}
              </p>
              <p className="mb-2 text-gray-700">
                <strong>Language:</strong> {book.language}
              </p>
              <p className="mb-2 text-gray-700">
                <strong>Published:</strong> {book.publishYear}
              </p>
              <p className="mb-3 text-sm text-gray-600">{book.description}</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <i className="text-lg ri-star-fill"></i>
                <span className="font-medium ">{book.rating}</span>
              </div>
            </div>

            <button
              onClick={() => onAddToLibrary(book)}
              className="self-start px-6 py-2 mt-4 font-semibold text-white rounded-lg cursor-pointer bg-main-border hover:bg-main-border/90"
            >
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
