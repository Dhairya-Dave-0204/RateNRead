import { useState } from "react";

const BookCard = ({ book, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isFeatured) {
    return (
      <div
        className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-64 md:w-1/3 md:h-auto">
          <img
            src={book.cover}
            alt={book.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between w-full p-6 bg-white md:w-2/3">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="mb-2 text-2xl font-bold text-primary">
                {book.title}
              </h3>
              <div className="flex items-center px-3 py-1 rounded-full bg-accent-blue">
                <i className="w-4 h-4 mr-1 ri-star-line text-accent-gold fill-accent-gold"></i>
                <span className="text-sm font-medium">{book.rating}</span>
              </div>
            </div>
            <p className="mb-3 text-text-mute">{book.author}</p>
            <p className="mb-6 text-tertiary">{book.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center font-medium text-main-border hover:text-main-border/80">
              View Details
              <i className="w-4 h-4 ml-1 ri-arrow-right-s-line"></i>
            </button>
            <button className="px-4 py-2 font-medium text-white rounded-full bg-main-border hover:bg-main-border/90">
              Add to Library
            </button>
          </div>
        </div>
        {isHovered && (
          <div className="absolute p-2 bg-white rounded-full shadow-md cursor-pointer top-4 right-4">
            <i className="w-5 h-5 ri-heart-3-line text-ternary-pink"></i>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 transform hover:scale-[1.03] hover:shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-64 overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="font-bold text-primary line-clamp-1"
            title={book.title}
          >
            {book.title}
          </h3>
          <div className="flex items-center bg-accent-blue px-2 py-0.5 rounded-full">
            <i className="w-3 h-3 mr-1 ri-star-line text-accent-gold fill-accent-gold"></i>
            <span className="text-xs font-medium">{book.rating}</span>
          </div>
        </div>
        <p className="mb-3 text-sm text-text-mute">{book.author}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres?.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="text-xs bg-accent-blue text-secondary px-2 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
          {book.genres?.length > 2 && (
            <span className="text-xs bg-accent-blue text-secondary px-2 py-0.5 rounded-full">
              +{book.genres.length - 2}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="text-sm font-medium text-main-border hover:text-main-border/80">
            View Details
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white rounded-full bg-main-border hover:bg-main-border/90">
            Add
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md cursor-pointer">
          <i className="w-4 h-4 ri-heart-3-line text-ternary-pink"></i>
        </div>
      )}
    </div>
  );
};

export default BookCard;
