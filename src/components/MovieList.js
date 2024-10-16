// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import axios from "../axios"; // Import axios instance
import "./MovieList.css"; // Style for movie list component

const base_url = "https://image.tmdb.org/t/p/original/";
const default_image = "path/to/default/image.jpg"; // Đường dẫn đến hình ảnh mặc định

function MovieList({ title, fetchUrl, isLargeRow = false, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl); // Sử dụng axios để gọi API
      setMovies(response.data.results); // Lưu kết quả vào state
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <div className="movie-list__posters">
        {movies.map((movie) => {
          // Kiểm tra từng trường hình ảnh
          const imageSrc = isLargeRow
            ? movie.poster_path
              ? `${base_url}${movie.poster_path}`
              : default_image // Hình mặc định nếu không có poster_path
            : movie.backdrop_path
              ? `${base_url}${movie.backdrop_path}`
              : default_image; // Hình mặc định nếu không có backdrop_path

          return (
            <img
              key={movie.id}
              className={`movie-list__poster ${
                isLargeRow && "movie-list__posterLarge"
              }`}
              src={imageSrc}
              alt={movie.name || movie.title || "No Title Available"}
              onClick={() => onMovieClick(movie)} // Thêm onClick handler
              onError={(e) => {
                e.target.onerror = null; // Ngăn việc lặp lại lỗi
                e.target.src = default_image; // Đổi sang ảnh mặc định nếu có lỗi
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
