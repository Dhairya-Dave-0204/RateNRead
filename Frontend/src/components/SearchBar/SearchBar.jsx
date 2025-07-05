import { useRef, useCallback, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const useDebouncedSearch = (callback, delay = 200) => {
  const timeoutRef = useRef(null);
  return useCallback((query) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(query), delay);
  }, [callback, delay]);
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  onSuggestionClick,
  setSuggestions,
}) => {
  const { backendUrl } = useContext(AppContext)

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(`${backendUrl}/api/books`, {
        params: {
          query,
          limit: 5,
        },
      });

      if (res.data.success) {
        const suggestionList = res.data.data.map((b) => ({
          id: b.book_id,
          title: b.title,
          author: b.authors[0],
        }));
        setSuggestions(suggestionList);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const debouncedSearch = useDebouncedSearch((query) => {
    if (query.trim().length > 0) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-xl max-lg:mx-auto lg:w-1/2">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={handleChange}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full p-2 mt-1 overflow-y-auto bg-white border rounded-md shadow-md max-h-60">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-2 py-1 transition cursor-pointer hover:bg-gray-100"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion.title} by {suggestion.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
