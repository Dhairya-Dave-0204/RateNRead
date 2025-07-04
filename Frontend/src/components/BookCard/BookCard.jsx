const BookCard = ({ book, onClick }) => (
  <div onClick={onClick} className="p-4 bg-white rounded shadow">
    <img src={book.image} alt={book.title} className="object-cover w-full h-48 mb-2" />
    <h3 className="text-lg font-bold line-clamp-1">{book.title}</h3>
    <p className="text-sm text-gray-600 line-clamp-1">by {book.authors.join(", ")}</p>
  </div>
);

export default BookCard;
