import React from "react";

const FilterSortBar = ({
  filterLanguage,
  setFilterLanguage,
  sortBy,
  setSortBy,
  languages,
  count,
}) => (
  <div className="flex flex-wrap items-center gap-4 mx-auto mb-6">
    <select
      value={filterLanguage}
      onChange={(e) => setFilterLanguage(e.target.value)}
      className="p-2 border rounded-md cursor-pointer"
    >
      <option value="all">All Languages</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="p-2 border rounded-md cursor-pointer"
    >
      <option value="dateAdded">Date Added</option>
      <option value="title">Title (A-Z)</option>
      <option value="rating">Rating</option>
    </select>

    <span className="ml-auto text-sm text-gray-500">
      {count} book{count !== 1 ? "s" : ""}
    </span>
  </div>
);

export default FilterSortBar;
