import { useState, useMemo, useEffect, useContext } from "react";
import {
  LibraryBookCard,
  LibraryHeader,
  BookModal,
  FilterSortBar,
  LibraryPagination,
} from "../../components/component_index";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const booksPerPage = 6;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [currentPage, setCurrentPage] = useState(1);

  const { backendUrl } = useContext(AppContext);

  const languages = useMemo(
    () => [...new Set(books.map((b) => b.language))],
    [books]
  );

  // Fetch all books in the library on mount
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const result = await axios.get(`${backendUrl}/api/library`, {
          withCredentials: true,
        });
        setBooks(result.data.books);
      } catch (error) {
        console.error("Error fetching the user library", error);
        toast.error("Error fetching the library!");
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, [backendUrl]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;
    if (filterLanguage !== "all") {
      filtered = books.filter((book) => book.language === filterLanguage);
    }
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "dateAdded":
          return new Date(b.created_at) - new Date(a.created_at);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [books, filterLanguage, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / booksPerPage);
  const paginatedBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Handle rating update
  const handleRating = async (libraryId, rating) => {
    try {
      await axios.put(
        `${backendUrl}/api/library/${libraryId}`,
        { rating },
        { withCredentials: true }
      );
      setBooks((prev) =>
        prev.map((book) =>
          book.library_id === libraryId ? { ...book, rating } : book
        )
      );
      toast.success("Rating updated");
    } catch (error) {
      console.error("Error updating book rating", error);
      toast.error("Rating update failed");
    }
  };

  // Handle notes save
  const handleSaveNotes = async () => {
    const libraryId = selectedBook?.library_id;
    if (!libraryId) {
      toast.error("No book selected");
      return;
    }

    try {
      await axios.put(
        `${backendUrl}/api/library/${libraryId}`,
        { notes: editingNotes },
        { withCredentials: true }
      );

      setBooks((prev) =>
        prev.map((book) =>
          book.library_id === libraryId
            ? { ...book, notes: editingNotes }
            : book
        )
      );
      setSelectedBook({ ...selectedBook, notes: editingNotes });
      toast.success("Notes saved");
    } catch (error) {
      console.error("Error saving notes", error);
      toast.error("Notes update failed");
    }
  };

  // Handle remove book
  const handleRemoveBook = async (libraryId) => {
    try {
      await axios.delete(`${backendUrl}/api/library/${libraryId}`, {
        withCredentials: true,
      });

      setBooks((prev) => prev.filter((b) => b.library_id !== libraryId));
      setSelectedBook(null);
      toast.success("Book removed from library");
    } catch (error) {
      console.error("Error deleting book", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 mx-auto max-md:mt-8 sm:px-6 lg:px-8">
      <LibraryHeader />

      <FilterSortBar
        filterLanguage={filterLanguage}
        setFilterLanguage={setFilterLanguage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        languages={languages}
        count={filteredAndSortedBooks.length}
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading your library...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
            {paginatedBooks.map((book) => (
              <LibraryBookCard
                key={book.library_id}
                book={book}
                onClick={() => {
                  setSelectedBook(book);
                  setEditingNotes(book.notes || "");
                }}
              />
            ))}
          </div>

          <LibraryPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          editingNotes={editingNotes}
          setEditingNotes={setEditingNotes}
          onClose={() => setSelectedBook(null)}
          onRate={handleRating}
          onRemove={handleRemoveBook}
          onSaveNotes={handleSaveNotes}
        />
      )}
    </div>
  );
};

export default Library;
