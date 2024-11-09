// src/components/MovieList.js
import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import "./MovieList.css";

const base_url = "https://image.tmdb.org/t/p/original/";
const default_image = "path/to/default/image.jpg";

function MovieList({ title, fetchUrl, isLargeRow = false, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [errorMovies, setErrorMovies] = useState(new Set());
  const movieListRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const scrollMovies = (direction) => {
    const container = movieListRef.current;
    const scrollAmount =
      direction === "left" ? -container.offsetWidth : container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleImageError = (id) => {
    setErrorMovies((prev) => new Set(prev).add(id));
  };

  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <div className="movie-list__container">
        <button
          className="scroll-button left"
          onClick={() => scrollMovies("left")}
        >
          &lt;
        </button>
        <div className="movie-list__posters" ref={movieListRef}>
          {movies
            .filter((movie) => !errorMovies.has(movie.id))
            .map((movie) => {
              const imageSrc = isLargeRow
                ? movie.poster_path
                  ? `${base_url}${movie.poster_path}`
                  : default_image
                : movie.backdrop_path
                ? `${base_url}${movie.backdrop_path}`
                : default_image;

              return (
                <img
                  key={movie.id}
                  className={`movie-list__poster ${
                    isLargeRow && "movie-list__posterLarge"
                  }`}
                  src={imageSrc}
                  alt={movie.name || movie.title || "No Title Available"}
                  onClick={() => onMovieClick(movie)}
                  onError={() => handleImageError(movie.id)}
                />
              );
            })}
        </div>
        <button
          className="scroll-button right"
          onClick={() => scrollMovies("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default MovieList;
