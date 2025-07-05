const FilterPanel = ({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
}) => (
  <div className="flex flex-col w-full gap-4 mt-4 sm:mt-0 sm:flex-row lg:items-center lg:justify-end lg::w-auto">
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg sm:w-auto"
    >
      <option value="all">All Languages</option>
      <option value="en">English</option>
    </select>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg sm:w-auto"
    >
      <option value="recent">Sort by Recent</option>
      <option value="rating">Sort by Rating</option>
      <option value="title">Sort by Title</option>
    </select>
  </div>
);

export default FilterPanel;
