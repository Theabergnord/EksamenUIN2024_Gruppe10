import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/client';

function MovieCard({ wishlist }) {
  const [movies, setMovies] = useState([]);
  const [fetchedImdbIds, setFetchedImdbIds] = useState(new Set()); // Set for å lagre fetchede id'er

  useEffect(() => {
    if (wishlist) { // 
      // Fetch movies fra Sanity basert på user's wishlist
      client
        .fetch('*[_type == "films" && imdbid in $imdbIds]{ title, genre, imdbid }', { imdbIds: wishlist })
        .then((sanityData) => {
          // Extract IMDb IDs from Sanity data
          const imdbIds = sanityData.map((movie) => movie.imdbid);
          // Filter out IMDb IDs that haven't been fetched yet
          const newImdbIds = imdbIds.filter((imdbId) => !fetchedImdbIds.has(imdbId));
          // Fetch additional movie data from API
          fetchMovieDataFromAPI(newImdbIds);
        })
        .catch((error) => {
          console.error('Error fetching movie data from Sanity:', error);
        });
    }
  }, [wishlist, fetchedImdbIds]);

 
  const fetchMovieDataFromAPI = async (imdbIds) => {
    try {
      console.log('Fetching movie data from API for IMDb IDs:', imdbIds);
      const updatedMovies = await Promise.all(
        imdbIds?.map(async (imdbid) => {
          if (fetchedImdbIds.has(imdbid)) {
            console.log('Skipping duplicate IMDb ID:', imdbid);
            return null; // Skip duplikate IMDb ID
          }
          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          });
          const data = await response.json();
          console.log('API response for', imdbid, ':', data); 
          setFetchedImdbIds((prevImdbIds) => new Set([...prevImdbIds, imdbid])); 
          return {
            imdbid,
            title: data.results && data.results.titleText && data.results.titleText.text, 
            year: data.results && data.results.releaseYear && data.results.releaseYear.year,
            genre: '',
            imageUrl: data.results && data.results.primaryImage && data.results.primaryImage.url, 
          };
        }).filter(Boolean) // Filter ut null verdier
      );

      console.log('Updated movies:', updatedMovies); // Log movie objekter
      setMovies((prevMovies) => [...prevMovies, ...updatedMovies]); // Update movies med ny data
    } catch (error) {
      console.error('Error fetching movie data from API:', error);
    }
  };

  return (
    <div>
      {movies?.length > 0 ? (
        movies?.map((movie, index) => {     
          const hasContent = movie.title || movie.genre || movie.imageUrl
          return hasContent && (
            <ul className="movieCard" key={index}>
              {movie.title && (
                <li className="movieItem">
                  <h2>
                    <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                      {movie.title} ({movie.year})
                    </a>
                  </h2>
                </li>
              )}
              {movie.imageUrl && (
                <li className="movieItem">
                  <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                    <img src={movie.imageUrl} alt={movie.title} />
                  </a>
                </li>
              )}
            </ul>
          );
        })
      ) : (
        <p>Vennligst vent mens jeg laster meg ferdig..:D</p>
      )}
    </div>
  );
}

export default MovieCard;
