const LibraryBookCard = ({ book, onClick }) => {
  const imageUrl = book.image
    ? book.image.replace(/^"|"$/g, "")
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div
      className="p-4 transition bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md"
      onClick={onClick}
    >
      {/* Use cleaned image URL */}
      <img
        src={imageUrl}
        alt={book.title}
        className="object-cover w-full h-48 rounded"
      />

      {/* Book title */}
      <h3 className="mt-2 text-lg font-semibold text-blue-900">{book.title}</h3>

      {/* Book author */}
      <p className="text-sm text-gray-600">by {book.author || "Unknown"}</p>
    </div>
  );
};

export default LibraryBookCard;
