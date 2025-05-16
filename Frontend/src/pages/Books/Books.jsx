import { useState, useEffect } from "react";
import { BooksHeader } from "../../components/component_index";
import { BOOKS_DATA, FEATURED_BOOKS } from "./bookData"

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
            <button className="flex items-center font-medium transition-colors duration-200 text-main-border hover:text-main-border/80">
              <span>View Details</span>
              <i className="w-4 h-4 ml-1 ri-arrow-right-s-line"></i>
            </button>
            <button className="px-4 py-2 font-medium text-white transition-colors duration-200 rounded-full bg-main-border hover:bg-main-border/90">
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
            <span className="text-xs font-medium ">{book.rating}</span>
          </div>
        </div>
        <p className="mb-3 text-sm text-text-mute">{book.author}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres &&
            book.genres.slice(0, 2).map((genre, idx) => (
              <span
                key={idx}
                className="text-xs bg-accent-blue text-secondary px-2 py-0.5 rounded-full"
              >
                {genre}
              </span>
            ))}
          {book.genres && book.genres.length > 2 && (
            <span className="text-xs bg-accent-blue text-secondary px-2 py-0.5 rounded-full">
              +{book.genres.length - 2}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="text-sm font-medium transition-colors duration-200 text-main-border hover:text-main-border/80">
            View Details
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white transition-colors duration-200 rounded-full bg-main-border hover:bg-main-border/90">
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

// Generic Carousel Component that can be reused
const Carousel = ({ items, renderItem, title = null, itemsToShow = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const maxIndex = Math.max(0, Math.ceil(items.length / itemsToShow) - 1);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    } else if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {title && <h3 className="mb-4 text-xl font-semibold">{title}</h3>}

      <div
        className="overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map(
            (_, index) => {
              const startIdx = index * itemsToShow;
              const itemsForSlide = items.slice(
                startIdx,
                startIdx + itemsToShow
              );

              return (
                <div key={index} className="flex justify-center min-w-full">
                  <div className="flex justify-center w-full gap-4">
                    {itemsForSlide.map((item) => renderItem(item))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow-md top-1/2 left-4 bg-white/80 hover:bg-white"
      >
        <i className="w-6 h-6 ri-arrow-left-s-line text-primary"></i>
      </button>

      <button
        onClick={nextSlide}
        className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow-md top-1/2 right-4 bg-white/80 hover:bg-white"
      >
        <i className="w-6 h-6 ri-arrow-right-s-line text-primary"></i>
      </button>
    </div>
  );
};

// Carousel Component specifically for featured books
const FeaturedCarousel = ({ books }) => {
  return (
    <Carousel
      items={books}
      renderItem={(book) => (
        <div key={book.id} className="w-full">
          <BookCard book={book} isFeatured={true} />
        </div>
      )}
    />
  );
};

// Books Carousel specifically for mobile view
const MobileBooksCarousel = ({ books }) => {
  return (
    <Carousel
      items={books}
      renderItem={(book) => (
        <div key={book.id} className="w-full max-w-xs">
          <BookCard book={book} />
        </div>
      )}
      itemsToShow={1}
    />
  );
};

// GenreSelector Component
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

function Books() {
  const [books, setBooks] = useState(BOOKS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");
  const [isMobile, setIsMobile] = useState(false);

  // Track window size to determine if mobile view should be shown
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    // Initial check
    checkIfMobile();

    // Listen for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Extract all unique genres
  const allGenres = [
    ...new Set(BOOKS_DATA.flatMap((book) => book.genres || [])),
  ];

  // Filter and sort books
  useEffect(() => {
    let filteredBooks = [...BOOKS_DATA];

    // Apply search filter
    if (searchTerm) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedGenres.some(
          (genre) => book.genres && book.genres.includes(genre)
        )
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "title":
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        filteredBooks.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        filteredBooks.sort((a, b) => Number(b.published) - Number(a.published));
        break;
      case "popularity":
      default:
        filteredBooks.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setBooks(filteredBooks);
  }, [searchTerm, selectedGenres, sortOption]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <>
      <div className="min-h-screen bg-background text-primary">
        <main className="container px-4 py-8 mx-auto">
          {/* Hero Section */}
          <section className="mb-12">
            <BooksHeader />

            {/* Featured Books Carousel */}
            <div className="mt-6 mb-20 md:mb-28">
              <FeaturedCarousel books={FEATURED_BOOKS} />
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="mb-20 md:mb-32">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <div className="flex flex-col gap-4 mb-6 md:flex-row">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="w-5 h-5 ri-search-2-line text-text-mute"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-main-border focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-48">
                  <GenreSelector
                    genres={allGenres}
                    selectedGenres={selectedGenres}
                    toggleGenre={toggleGenre}
                  />
                </div>

                <div className="w-full md:w-48">
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none appearance-none cursor-pointer"
                    >
                      <option value="popularity">Sort by Popularity</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="recent">Sort by Recent</option>
                      <option value="title">Sort by Title</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="w-5 h-5 ri-arrow-down-s-line text-tertiary"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {selectedGenres.length > 0 && (
                  <button
                    onClick={() => setSelectedGenres([])}
                    className="text-sm text-main-border hover:text-main-border/80"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Books Grid or Carousel based on screen size */}
          <section>
            <h2 className="flex items-center mb-6 text-2xl font-bold">
              <i className="w-6 h-6 mr-2 ri-book-open-line"></i>
              Explore Books
            </h2>

            {books.length > 0 ? (
              <>
                {/* Mobile Carousel View */}
                <div className={`${isMobile ? "block" : "hidden"}`}>
                  <MobileBooksCarousel books={books} />
                </div>

                {/* Desktop Grid View */}
                <div
                  className={`${
                    isMobile ? "hidden" : "block"
                  } grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
                >
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center bg-white shadow-md rounded-xl">
                <div className="mb-4">📚</div>
                <h3 className="mb-2 text-xl font-semibold">No books found</h3>
                <p className="text-tertiary">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </section>

          {/* New CTA Section (replacing Recommendations) */}
          <section className="mt-20 mb-10">
            <div className="overflow-hidden shadow-lg bg-gradient-to-r from-main-border via-[#a29bfe] to-ternary-pink rounded-xl">
              {/* Left side with CTA content */}
              <div className="flex flex-col items-center justify-center p-8 md:p-12">
                <h2 className="mb-4 text-3xl font-bold text-white">
                  Start Your Reading Journey Today
                </h2>
                <p className="max-w-3xl mb-6 text-white/90">
                  Join thousands of readers who have already discovered their
                  next favorite books through ReadnRate. Create your personal
                  library, track your reading progress, and get personalized
                  recommendations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 font-medium transition-colors duration-300 bg-white rounded-full cursor-pointer text-main-border hover:bg-gray-200">
                    Create Free Account
                  </button>
                  <button className="px-6 py-3 font-medium text-white transition-colors duration-300 border border-white rounded-full cursor-pointer hover:bg-white/20">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Books;
