import React from "react";

type SearchBarProps = {
  search: string;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearch }) => {
  return (
    <input
      type="search"
      placeholder="Search issues..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      className="input"
    />
  );
};

export default SearchBar;
