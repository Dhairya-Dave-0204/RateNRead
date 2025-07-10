import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [userLibrary, setUserLibrary] = useState([]);

  const { backendUrl } = useContext(AppContext);

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

  const fetchUserLibrary = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/library`, {
        withCredentials: true,
      });
      const userBookIds = res.data.books.map((b) => b.book_id);
      setUserLibrary(userBookIds);
    } catch (error) {
      console.error("Failed to fetch user library:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedLanguage, sortBy, currentPage]);

  useEffect(() => {
    fetchUserLibrary();
  }, [backendUrl]);

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

  const handleBookClick = (book) => setSelectedBook(book);
  const handleCloseModal = () => setSelectedBook(null);

  const handleAddToLibrary = async (book) => {
    if (userLibrary.includes(book.book_id)) {
      toast.info(`${book.title} is already in your library.`);
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/library/add`,
        { bookId: book.book_id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`${book.title} added to your library.`);
        setUserLibrary((prev) => [...prev, book.book_id]);
      }
    } catch (error) {
      console.error("Failed to add to library:", error);
      toast.error("Failed to add book to library.");
    }
  };

  const allLanguages = ["all", "en"];

  return (
    <main className="min-h-screen">
      <div className="px-4 py-8 mx-auto max-md:mt-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Book Library</h1>
          <p className="text-gray-600">
            Discover and explore our collection of {totalBooks} books
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Books" value={"900+"} color="#4a6cf7" />
          <StatCard label="Languages" value={8} color="#4caf50" />
          <StatCard label="Showing" value={books.length} color="#f29ca3" />
          <StatCard label="Filtered" value={books.length} color="#a9e5bb" />
        </div>
      </div>

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

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.book_id}
            book={book}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <BookDetail
        book={selectedBook}
        onClose={handleCloseModal}
        onAddToLibrary={handleAddToLibrary}
        userLibrary={userLibrary}
      />
    </main>
  );
};

export default Browse;
