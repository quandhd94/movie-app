// src/components/ResultList.js
import React from "react";
import "./ResultList.css";

const ResultList = ({ results, onMovieClick }) => {
  return (
    <div className="result-list">
      {results.map((movie) => (
        <div
          key={movie.id}
          className="result-item"
          onClick={() => onMovieClick(movie)} // Gọi hàm khi nhấp vào phim
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                : "path/to/default/image.jpg"
            } // Thay thế bằng hình ảnh mặc định nếu không có poster_path
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
