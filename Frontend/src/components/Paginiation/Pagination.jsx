const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center mt-8 space-x-2 ">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Previous
      </button>

      {/* Left Ellipsis */}
      {visiblePages[0] > 2 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            1
          </button>
          <span className="px-2 text-gray-500">...</span>
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded text-sm ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
