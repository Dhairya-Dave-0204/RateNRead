import { useState } from "react";

const GenreSelector = ({ genres, selectedGenres, toggleGenre }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-200 rounded-lg cursor-pointer text-tertiary hover:bg-accent-blue"
      >
        <span>
          {selectedGenres.length
            ? `${selectedGenres.length} Selected`
            : "All Genres"}
        </span>
        <i
          className={`ri-arrow-down-s-line w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60">
          {genres.map((genre) => (
            <div
              key={genre}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-accent-blue"
              onClick={() => toggleGenre(genre)}
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => {}}
                className="mr-2 accent-main-border"
              />
              <span>{genre}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
