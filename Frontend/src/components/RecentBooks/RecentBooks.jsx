import { recentBooks } from "./data"

function RecentBooks() {

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div
      className="rounded-2xl p-6 shadow-sm border"
      style={{
        backgroundColor: "white",
        borderColor: "#e5e5e7",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold" style={{ color: "#1c1c1e" }}>
          Recent Library Activity
        </h3>
        <button className="text-sm font-medium" style={{ color: "#4a6cf7" }}>
          View All Books
        </button>
      </div>

      <div className="space-y-4">
        {recentBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-start gap-4 p-4 rounded-xl border transition-colors hover:shadow-sm"
            style={{ borderColor: "#f2f2f7" }}
          >
            <div
              className={`w-12 h-16 ${book.color} rounded-lg flex-shrink-0`}
            ></div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-semibold truncate"
                style={{ color: "#1c1c1e" }}
              >
                {book.title}
              </h4>
              <p className="text-sm mb-2" style={{ color: "#a1a1a3" }}>
                by {book.author}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(book.rating)}</div>
                <span className="text-sm" style={{ color: "#a1a1a3" }}>
                  {book.rating}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#a1a1a3" }}>
                  Added {book.dateAdded}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {book.status === "completed" ? "Completed" : "Reading"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBooks;
