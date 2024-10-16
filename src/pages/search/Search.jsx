// src/pages/search/Search.jsx
import React, { useState } from "react";
import SearchForm from "../../components/SearchForm";
import ResultList from "../../components/ResultList";
import MovieDetail from "../../components/MovieDetail"; // Import MovieDetail
import axios from "../../axios"; // Cấu hình axios đã có trong project của bạn

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State để lưu thông tin phim được chọn

  const handleSearch = async (query) => {
    const API_KEY = "656f253ef1e0df408d40130f2d207df0";
    try {
      const response = await axios.get(
        `/search/movie?api_key=${API_KEY}&language=en&query=${query}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies: ", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Lưu thông tin phim được chọn
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null); // Đóng thông tin chi tiết phim
  };

  return (
    <div className="search-page">
      <SearchForm onSearch={handleSearch} />
      <h2 className="search-result-title">Search Results</h2>
      <ResultList results={searchResults} onMovieClick={handleMovieClick} />
      {selectedMovie && (
        <MovieDetail movieData={selectedMovie} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Search;
