import React, { useState, useMemo } from "react";

function Library() {
  // Sample book data - in a real app this would come from an API or database
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

  const [expandedBook, setExpandedBook] = useState(null);
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [editingNotes, setEditingNotes] = useState(null);
  const [tempNotes, setTempNotes] = useState("");

  // Get unique languages for filter
  const languages = useMemo(() => {
    const uniqueLanguages = [...new Set(books.map((book) => book.language))];
    return uniqueLanguages.sort();
  }, [books]);

  // Filter and sort books
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

  const handleRating = (bookId, rating) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === bookId ? { ...book, rating } : book))
    );
  };

  const handleNotesEdit = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    setTempNotes(book.notes || "");
    setEditingNotes(bookId);
  };

  const handleNotesSave = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, notes: tempNotes } : book
      )
    );
    setEditingNotes(null);
    setTempNotes("");
  };

  const handleNotesCancel = () => {
    setEditingNotes(null);
    setTempNotes("");
  };

  const StarRating = ({ rating, onRate, bookId }) => {
    const [hover, setHover] = useState(0);

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(bookId, star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors duration-200 focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${
                star <= (hover || rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        <span
          className="ml-2 text-sm"
          style={{ color: "var(--color-text-mute)" }}
        >
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="mb-2 text-4xl font-bold"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            My Library
          </h1>
          <p style={{ color: "var(--color-text-mute)" }}>
            Manage your personal collection of books, ratings, and notes
          </p>
        </div>

        {/* Filters and Sort */}
        <div
          className="flex flex-col gap-4 p-4 mb-8 sm:flex-row rounded-xl"
          style={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              style={{ color: "var(--color-accent-gold)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Language:
            </label>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e7eb",
                color: "var(--color-primary)",
                focusRingColor: "var(--color-accent-gold)",
              }}
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              style={{ color: "var(--color-accent-gold)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"
              />
            </svg>
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e7eb",
                color: "var(--color-primary)",
                focusRingColor: "var(--color-accent-gold)",
              }}
            >
              <option value="dateAdded">Date Added</option>
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div
            className="ml-auto text-sm"
            style={{ color: "var(--color-text-mute)" }}
          >
            {filteredAndSortedBooks.length} book
            {filteredAndSortedBooks.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedBooks.map((book) => (
            <div key={book.id} className="group">
              {/* Book Card */}
              <div
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 cursor-pointer ${
                  expandedBook === book.id
                    ? "shadow-lg scale-105"
                    : "hover:shadow-md hover:scale-102"
                }`}
                style={{
                  borderColor:
                    expandedBook === book.id
                      ? "var(--color-accent-gold)"
                      : "#e5e7eb",
                }}
                onClick={() =>
                  setExpandedBook(expandedBook === book.id ? null : book.id)
                }
              >
                <div className="p-6">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="flex-shrink-0 object-cover w-16 h-20 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="mb-1 text-lg font-semibold leading-tight"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {book.title}
                      </h3>
                      <p
                        className="mb-2 text-sm"
                        style={{ color: "var(--color-text-mute)" }}
                      >
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: "var(--color-accent-blue)",
                            color: "var(--color-accent-gold)",
                          }}
                        >
                          {book.language}
                        </span>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span
                            className="text-sm"
                            style={{ color: "var(--color-text-mute)" }}
                          >
                            {book.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedBook === book.id && (
                    <div
                      className="pt-4 space-y-4 border-t"
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      {/* Description */}
                      <div>
                        <h4
                          className="mb-2 font-medium"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Description
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-mute)" }}
                        >
                          {book.description}
                        </p>
                      </div>

                      {/* Book Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-primary)" }}
                          >
                            ISBN:
                          </span>
                          <p style={{ color: "var(--color-text-mute)" }}>
                            {book.isbn}
                          </p>
                        </div>
                        <div>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-primary)" }}
                          >
                            Date Added:
                          </span>
                          <p style={{ color: "var(--color-text-mute)" }}>
                            {new Date(book.dateAdded).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div>
                        <h4
                          className="mb-2 font-medium"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Your Rating
                        </h4>
                        <StarRating
                          rating={book.rating}
                          onRate={handleRating}
                          bookId={book.id}
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className="font-medium"
                            style={{ color: "var(--color-primary)" }}
                          >
                            Your Notes
                          </h4>
                          {editingNotes !== book.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotesEdit(book.id);
                              }}
                              className="px-3 py-1 text-sm transition-colors duration-200 rounded-lg"
                              style={{
                                color: "var(--color-accent-gold)",
                                backgroundColor: "var(--color-accent-blue)",
                              }}
                            >
                              Edit
                            </button>
                          )}
                        </div>

                        {editingNotes === book.id ? (
                          <div
                            className="space-y-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <textarea
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Write your thoughts about this book..."
                              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2"
                              style={{
                                borderColor: "#e5e7eb",
                                focusRingColor: "var(--color-accent-gold)",
                                minHeight: "100px",
                              }}
                              rows="4"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleNotesSave(book.id)}
                                className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg"
                                style={{
                                  backgroundColor: "var(--color-accent-gold)",
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={handleNotesCancel}
                                className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                                style={{
                                  color: "var(--color-text-mute)",
                                  backgroundColor: "#f3f4f6",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-sm leading-relaxed p-3 rounded-lg min-h-[60px]"
                            style={{
                              backgroundColor: "var(--color-accent-blue)",
                              color: "var(--color-text-mute)",
                            }}
                          >
                            {book.notes ||
                              "No notes yet. Click 'Edit' to add your thoughts about this book."}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedBooks.length === 0 && (
          <div className="py-16 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "var(--color-text-mute)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3
              className="mb-2 text-xl font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              No books found
            </h3>
            <p style={{ color: "var(--color-text-mute)" }}>
              {filterLanguage !== "all"
                ? "Try adjusting your filters or add some books in this language."
                : "Start building your library by adding your first book."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
