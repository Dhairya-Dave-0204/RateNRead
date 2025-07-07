import React from "react";

const LibraryPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 space-x-2">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`px-4 py-2 rounded ${
            p === currentPage ? "bg-blue-700 text-white" : "bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default LibraryPagination;
