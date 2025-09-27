const BookCard = ({ book, onClick }) => {
  // Clean the image URL
  const imageUrl = book.image
    ? book.image.replace(/^"|"$/g, "") // remove wrapping quotes if present
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div onClick={onClick} className="p-4 bg-white rounded shadow cursor-pointer">
      <img
        src={imageUrl}
        alt={book.title}
        className="object-cover w-full h-48 mb-2 rounded"
      />
      <h3 className="text-lg font-bold line-clamp-1">{book.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-1">
        by {book.authors?.join(", ") || "Unknown"}
      </p>
    </div>
  );
};

export default BookCard;
