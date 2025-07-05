import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import {
  BookCard,
  Pagination,
  SearchBar,
  FilterPanel,
  StatCard,
  BookDetail,
} from "../../components/component_index";

const BOOKS_PER_PAGE = 12;

const Browse = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => setSelectedBook(book);
  const handleCloseModal = () => setSelectedBook(null);
  const handleAddToLibrary = (book) => {
    console.log("Book added:", book);
    alert(`${book.title} added to your library!`);
  };

  const { backendUrl } = useContext(AppContext)

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/books`, {
        params: {
          page: currentPage,
          limit: BOOKS_PER_PAGE,
          query: searchQuery,
          language: selectedLanguage,
          sortBy,
        },
      });

      if (response.data.success) {
        setBooks(response.data.data);
        setTotalBooks(response.data.pagination.total);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("❌ Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedLanguage, sortBy, currentPage]);

  // Optional search suggestions from currently displayed books
  useEffect(() => {
    if (!searchQuery.trim()) return setSearchSuggestions([]);
    const suggestions = books
      .filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map((b) => ({
        id: b.book_id,
        title: b.title,
        author: b.authors?.[0] || "Unknown",
      }));
    setSearchSuggestions(suggestions);
  }, [searchQuery, books]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSuggestionSelect = (s) => {
    setSearchQuery(s.title);
    setSearchSuggestions([]);
  };

  const allLanguages = ["all", "en"]; // only English books in DB

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="px-4 py-8 mx-auto max-md:mt-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Book Library</h1>
          <p className="text-gray-600">
            Discover and explore our collection of {totalBooks} books
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Total Books"
            value={books.length}
            color="#4a6cf7"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            }
            label="Languages"
            value={8}
            color="#4caf50"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Filters */}
      <div className="flex flex-col gap-4 mt-8 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          suggestions={searchSuggestions}
          onSuggestionClick={handleSuggestionSelect}
          setSuggestions={setSearchSuggestions}
        />
        <FilterPanel
          languages={allLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.book_id} book={book} onClick={() => handleBookClick(book)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modal */}
      <BookDetail
        book={selectedBook}
        onClose={handleCloseModal}
        onAddToLibrary={handleAddToLibrary}
      />
    </main>
  );
};

export default Browse;



