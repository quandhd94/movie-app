// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./MovieDetail.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function MovieDetail({ movieData, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchTrailer() {
      if (!movieData) return; // Kiểm tra nếu không có movieData

      try {
        const response = await axios.get(
          `/movie/${movieData.id}/videos?api_key=656f253ef1e0df408d40130f2d207df0`
        );
        const trailers = response.data.results.filter(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        );
        setTrailerUrl(trailers.length ? trailers[0].key : ""); // Cập nhật trailerUrl
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }
    fetchTrailer();
  }, [movieData]);

  const opts = {
    height: "350",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="movie-detail">
      <button className="movie-detail__close" onClick={onClose}>
        &times;
      </button>
      {movieData && (
        <div className="movie-detail__content">
          <div className="movie-detail__info">
            <h2>{movieData.title || movieData.name}</h2>
            <p>{movieData.overview}</p>
          </div>
          <div className="movie-detail__trailer">
            {trailerUrl ? (
              <YouTube videoId={trailerUrl} opts={opts} />
            ) : (
              <img
                className="movie-detail__backdrop"
                src={
                  movieData.backdrop_path
                    ? `${base_url}${movieData.backdrop_path}`
                    : "path/to/default/image.jpg"
                } // Hình ảnh mặc định nếu không có backdrop_path
                alt={movieData.title || movieData.name}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
