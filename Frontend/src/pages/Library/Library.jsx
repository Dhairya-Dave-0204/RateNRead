import { useState, useMemo } from "react";
import {
  LibraryBookCard,
  LibraryHeader,
  BookModal,
  FilterSortBar,
  LibraryPagination,
} from "../../components/component_index";

const booksPerPage = 6;

const Library = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "A classic American novel set in the Jazz Age, telling the story of Jay Gatsby's pursuit of the American Dream and his obsession with Daisy Buchanan.",
      isbn: "978-0-7432-7356-5",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      dateAdded: "2024-01-15",
      rating: 4,
      notes:
        "An incredible exploration of wealth, love, and the American Dream. Fitzgerald's prose is absolutely beautiful.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
      isbn: "978-0-06-112008-4",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      dateAdded: "2024-02-10",
      rating: 5,
      notes:
        "A powerful story about morality and justice. Atticus Finch remains one of literature's most admirable characters.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      description:
        "A dystopian social science fiction novel about totalitarian control and the struggle for individual freedom in a surveillance state.",
      isbn: "978-0-452-28423-4",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop",
      dateAdded: "2024-03-05",
      rating: 5,
      notes:
        "Frighteningly relevant to today's world. Orwell's vision of surveillance and thought control is chilling.",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description:
        "A romantic novel that critiques the British landed gentry at the end of the 18th century through the relationship between Elizabeth Bennet and Mr. Darcy.",
      isbn: "978-0-14-143951-8",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      dateAdded: "2024-01-28",
      rating: 4,
      notes:
        "Austen's wit and social commentary are timeless. Elizabeth Bennet is a wonderfully complex protagonist.",
    },
    {
      id: 5,
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      description:
        "A poetic tale about a young prince who travels from planet to planet, learning about the nature of human relationships and the meaning of life.",
      isbn: "978-2-07-040837-2",
      language: "French",
      image:
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
      dateAdded: "2024-02-20",
      rating: 5,
      notes:
        "A beautiful philosophical tale that speaks to both children and adults. The illustrations are enchanting.",
    },
    {
      id: 6,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      description:
        "A multi-generational saga of the Buendía family in the fictional town of Macondo, blending reality with fantastical elements.",
      isbn: "978-84-376-0494-4",
      language: "Spanish",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      dateAdded: "2024-03-12",
      rating: 4,
      notes:
        "Magical realism at its finest. García Márquez creates a world that feels both mythical and deeply real.",
    },
  ]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [currentPage, setCurrentPage] = useState(1);

  const languages = useMemo(
    () => [...new Set(books.map((b) => b.language))],
    [books]
  );

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
          return new Date(b.dateAdded) - new Date(a.dateAdded);
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

  const handleRating = (bookId, rating) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, rating } : b))
    );
  };

  const handleSaveNotes = (bookId, newNotes) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, notes: newNotes } : b))
    );
    setSelectedBook(null);
  };

  const handleRemoveBook = (bookId) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setSelectedBook(null);
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

      <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {paginatedBooks.map((book) => (
          <LibraryBookCard
            key={book.id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      <LibraryPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {selectedBook && (
        <BookModal
          book={selectedBook}
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
