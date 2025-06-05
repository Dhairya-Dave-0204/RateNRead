import React, { useState, useEffect, useCallback, useRef } from "react";

const generateMockBooks = () => {
  const books = [];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Japanese",
    "Chinese",
  ];
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "History",
    "Philosophy",
  ];
  const sampleTitles = [
    "The Great Adventure",
    "Whispers in Time",
    "Digital Dreams",
    "Ocean Depths",
    "Mountain Peaks",
    "City Lights",
    "Forest Shadows",
    "Desert Winds",
    "River Stories",
    "Sky Dancers",
    "Hidden Treasures",
    "Ancient Wisdom",
    "Modern Tales",
    "Future Visions",
    "Past Memories",
    "Silent Echoes",
    "Loud Whispers",
    "Gentle Thunder",
    "Fierce Calm",
    "Bright Darkness",
  ];
  const sampleAuthors = [
    "John Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
    "David Wilson",
    "Lisa Anderson",
    "James Taylor",
    "Maria Garcia",
    "Robert Martinez",
    "Jennifer Lopez",
    "Christopher Lee",
    "Amanda White",
    "Daniel Harris",
    "Michelle Clark",
    "Kevin Lewis",
  ];

  for (let i = 1; i <= 255; i++) {
    const title =
      sampleTitles[Math.floor(Math.random() * sampleTitles.length)] + ` ${i}`;
    const author =
      sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)];
    const language = languages[Math.floor(Math.random() * languages.length)];
    const genre = genres[Math.floor(Math.random() * genres.length)];

    books.push({
      book_id: i,
      title: title,
      authors: [author],
      description: `An engaging ${genre.toLowerCase()} novel that takes readers on an unforgettable journey. This compelling story explores themes of human nature, relationships, and personal growth through masterful storytelling and rich character development.`,
      image: `https://picsum.photos/300/400?random=${i}`,
      ISBN: `978-${Math.floor(Math.random() * 9)}${Math.floor(
        Math.random() * 9
      )}${Math.floor(Math.random() * 9)}-${Math.floor(
        Math.random() * 9
      )}${Math.floor(Math.random() * 9)}-${Math.floor(
        Math.random() * 9
      )}${Math.floor(Math.random() * 9)}${Math.floor(
        Math.random() * 9
      )}-${Math.floor(Math.random() * 9)}`,
      language: language,
      genre: genre,
      rating: Math.floor(Math.random() * 5) + 1,
      pages: Math.floor(Math.random() * 500) + 100,
      publishYear: Math.floor(Math.random() * 30) + 1994,
    });
  }
  return books;
};

function Browse() {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const searchTimeoutRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const modalRef = useRef(null);

  const BOOKS_PER_PAGE = 12;

  // Initialize mock data
  useEffect(() => {
    const mockBooks = generateMockBooks();
    setBooks(mockBooks);
    setFilteredBooks(mockBooks);
    setDisplayedBooks(mockBooks.slice(0, BOOKS_PER_PAGE));
  }, []);

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  // Search debouncing
  const debouncedSearch = useCallback(
    (query) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        if (query.length > 0) {
          const suggestions = books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.authors.some((author) =>
                  author.toLowerCase().includes(query.toLowerCase())
                )
            )
            .slice(0, 5)
            .map((book) => ({
              id: book.book_id,
              title: book.title,
              author: book.authors[0],
            }));

          setSearchSuggestions(suggestions);
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      }, 300);
    },
    [books]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Filter and sort books
  useEffect(() => {
    let filtered = books;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authors.some((author) =>
            author.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply language filter
    if (selectedLanguage !== "all") {
      filtered = filtered.filter((book) => book.language === selectedLanguage);
    }

    // Apply sort
    switch (sortBy) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
      default:
        filtered.sort((a, b) => b.publishYear - a.publishYear);
        break;
    }

    setFilteredBooks(filtered);
    setDisplayedBooks(filtered.slice(0, BOOKS_PER_PAGE));
    setCurrentPage(1);
    setHasMore(filtered.length > BOOKS_PER_PAGE);
  }, [searchQuery, selectedLanguage, sortBy, books]);

  // Infinite scroll
  const loadMoreBooks = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = currentPage * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const newBooks = filteredBooks.slice(startIndex, endIndex);

    setTimeout(() => {
      setDisplayedBooks((prev) => [...prev, ...newBooks]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filteredBooks.length);
      setLoading(false);
    }, 500);
  }, [currentPage, filteredBooks, hasMore, loading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBooks();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreBooks]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleAddToLibrary = (book) => {
    // Add your library logic here
    alert(`"${book.title}" has been added to your library!`);
    closeModal();
  };

  const languages = [...new Set(books.map((book) => book.language))].sort();

  const StatCard = ({ icon, label, value, color }) => (
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold" style={{ color }}>
            {value}
          </p>
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: color + "20" }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const BookCard = ({ book }) => (
    <div 
      className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md group"
      onClick={() => openModal(book)}
    >
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full top-3 right-3 bg-white/90 backdrop-blur-sm">
          <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {book.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-gray-900 line-clamp-2">
          {book.title}
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          by {book.authors.join(", ")}
        </p>
        <p className="mb-3 text-xs text-gray-500 line-clamp-2">
          {book.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            {book.language}
          </span>
          <span>{book.pages} pages</span>
        </div>
      </div>
    </div>
  );

  const BookModal = ({ book, isOpen, onClose, onAddToLibrary }) => {
    if (!isOpen || !book) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div 
          ref={modalRef}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute z-10 p-2 transition-colors rounded-full shadow-md cursor-pointer top-4 right-4 bg-white/90 hover:bg-white"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
            {/* Book Image */}
            <div className="flex-shrink-0 p-6 md:w-1/3">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-auto max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Book Details */}
            <div className="flex-1 p-6 md:p-8">
              <div className="mb-4">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  {book.title}
                </h1>
                <p className="mb-4 text-lg text-gray-600">
                  by {book.authors.join(", ")}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < book.rating ? 'fill-yellow-400' : 'fill-gray-200'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {book.rating}/5 stars
                  </span>
                </div>
              </div>

              {/* Book Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Language</h3>
                  <p className="text-gray-900">{book.language}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Genre</h3>
                  <p className="text-gray-900">{book.genre}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Pages</h3>
                  <p className="text-gray-900">{book.pages}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Published</h3>
                  <p className="text-gray-900">{book.publishYear}</p>
                </div>
              </div>

              {/* ISBN */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-500">ISBN</h3>
                <p className="p-2 font-mono text-sm text-gray-900 rounded bg-gray-50">
                  {book.ISBN}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
                <p className="leading-relaxed text-gray-700">
                  {book.description}
                </p>
              </div>

              {/* Add to Library Button */}
              <button
                onClick={() => onAddToLibrary(book)}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Stats */}
        <div className="px-4 py-8 mx-auto max-md:mt-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Book Library
            </h1>
            <p className="text-gray-600">
              Discover and explore our collection of {books.length} books
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Total Books"
              value={books.length}
              color="#4a6cf7"
            />
            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              }
              label="Languages"
              value={languages.length}
              color="#4caf50"
            />
            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              label="Showing"
              value={displayedBooks.length}
              color="#f29ca3"
            />
            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              label="Filtered"
              value={filteredBooks.length}
              color="#a9e5bb"
            />
          </div>
        </div>

      {/* Search and Filters */}
      <div className="px-4 py-6 mx-auto sm:px-6 lg:px-8">
        <div className="p-6 mb-6 border border-gray-100 shadow-sm bg-white/50 rounded-xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="relative">
                <svg
                  className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search books by title, author, or description..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchSuggestions.length > 0 && setShowSuggestions(true)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="w-full py-3 pl-10 pr-4 transition-colors border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">
                        {suggestion.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        by {suggestion.author}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Language Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title A-Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {displayedBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedBooks.map((book) => (
              <BookCard key={book.book_id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.935-6.086-2.454C4.354 10.977 3 8.61 3 6a9.003 9.003 0 0118 0c0 2.61-1.354 4.977-2.914 6.546A7.962 7.962 0 0112 15z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No books found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="h-10" />

        {/* End of Results */}
        {!hasMore && displayedBooks.length > 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              You've reached the end of the collection
            </p>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      <BookModal
        book={selectedBook}
        isOpen={showModal}
        onClose={closeModal}
        onAddToLibrary={handleAddToLibrary}
      />
    </div>
  );
}

export default Browse;