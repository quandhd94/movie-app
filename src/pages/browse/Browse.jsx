import React, { useState } from "react";
import MovieList from "../../components/MovieList";
import requests from "../../requests";
import MovieDetail from "../../components/MovieDetail"; // Import MovieDetail component

function Browse() {
  const [selectedMovie, setSelectedMovie] = useState(null); // State to track selected movie

  // Function to handle movie click
  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Deselect if the same movie is clicked again
    } else {
      setSelectedMovie(movie); // Set the clicked movie as selected
    }
  };

  return (
    <div>
      <MovieList
        title="Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        onMovieClick={handleMovieClick} // Pass click handler to MovieList
      />
      <MovieList
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        onMovieClick={handleMovieClick}
      />
      <MovieList
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        onMovieClick={handleMovieClick}
      />

      {/* Render MovieDetail component if a movie is selected */}
      {selectedMovie && (
        <MovieDetail
          movieData={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Browse;
