// src/components/SearchForm.js
import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Gọi hàm tìm kiếm khi bấm nút
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button
        type="button"
        className="reset-button"
        onClick={() => setSearchQuery("")}
      >
        RESET
      </button>
      <button type="submit" className="search-button">
        SEARCH
      </button>
    </form>
  );
};

export default SearchForm;
