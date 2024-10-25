import React, { useState } from "react";
import axios from "axios";
import  "./index.css"


const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage(null);

    const BaseURL = "https://www.omdbapi.com"; // OMDb API base URL
    const API_KEY = "3695b132"; // Ensure your API key is set in .env

    if (!API_KEY) {
      setErrorMessage("API key is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(BaseURL, {
        params: {
          s: searchQuery,
          page: 1, // Add pagination as needed
          apikey: API_KEY,
        },
      });

      if (response.data.Response === "True") {
        setMovieList(response.data.Search); // `Search` is the array of movies returned
      } else {
        setErrorMessage(response.data.Error);
      }
    } catch (error) {
      setErrorMessage("Error fetching movie data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-search-container" style={{ textAlign: 'center', margin: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', fontSize: '16px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Search</button>

      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {movieList.map((movie) => (
          <div key={movie.imdbID} className="movie-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', margin: '10px', width: '150px', textAlign: 'center' }}>
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
