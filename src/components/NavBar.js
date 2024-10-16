import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [movieOverview, setMovieOverview] = useState("");
  const navigate = useNavigate();

  // Lấy danh sách phim từ API
  const fetchPopularMovies = async () => {
    const API_KEY = "656f253ef1e0df408d40130f2d207df0";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const mostPopularMovie = data.results[0];
      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${mostPopularMovie.backdrop_path}`
      );
      setMovieTitle(mostPopularMovie.title);
      setMovieOverview(mostPopularMovie.overview);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavBackground(true);
    } else {
      setNavBackground(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Thanh NavBar */}
      <nav className={navBackground ? "nav black" : "nav transparent"}>
        <div className="nav__container">
          <h1 className="nav__logo" onClick={() => navigate("/")}>
            Movie App
          </h1>
          <div className="nav__search" onClick={() => navigate("/search")}>
            <svg
              className="search-icon"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </div>
        </div>
      </nav>

      {/* Nội dung với ảnh nền */}
      <div
        className="nav__background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="nav__info">
          <h2 className="nav__title">{movieTitle}</h2>
          <p className="nav__overview">{movieOverview}</p>
          <div className="nav__buttons">
            <button className="nav__button play">Play</button>
            <button className="nav__button mylist">My List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
