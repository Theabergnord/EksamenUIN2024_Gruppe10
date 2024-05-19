/*import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/client';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [fetchedImdbIds, setFetchedImdbIds] = useState(new Set()); // Set for å lagre fetchede id'er

  useEffect(() => {
    // Fetcher filmer fra Sanity
    client
    .fetch('*[_type == "films"]{ title, genre, imdbid }')
      .then((sanityData) => {
        //console.log('Sanity data:', sanityData); // Log data fra Sanity
        // Extracte IMDb IDer fra Sanity data
        const imdbIds = sanityData.map((movie) => movie.imdbid);
        //console.log('IMDb IDs from Sanity:', imdbIds); // Log imdb IDer
        // Filtrerer ut imdbid som ikke har blitt fetchet
        const newImdbIds = imdbIds.filter((imdbId) => !fetchedImdbIds.has(imdbId)); // Sjekk om IMDb ID er lagret
        //console.log('New IMDb IDs to fetch:', newImdbIds); // Log imdb id'er i nye variabelen
        // Fetche resten av info fra API'et
        fetchMovieDataFromAPI(newImdbIds);
      })
      .catch((error) => {
        console.error('Error fetching movie data from Sanity:', error);
      });
  }, []); 

  const fetchMovieDataFromAPI = async (imdbIds) => {
    try {
      //console.log('Fetching movie data from API for IMDb IDs:', imdbIds);
      const updatedMovies = await Promise.all(
        imdbIds?.map(async (imdbid) => {
          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          });
          const data = await response.json();
          //console.log('API response for', imdbid, ':', data); // Log  API response for hver film
          if (fetchedImdbIds.has(imdbid)) {
            //console.log('Skipping duplicate IMDb ID:', imdbid);
            return null; // Skip duplikate imdb id
          }
          setFetchedImdbIds((prevImdbIds) => new Set([...prevImdbIds, imdbid])); // Legge til IMDb ID til fetcha IDer
          return {
            imdbid,
            title: data.results && data.results.titleText && data.results.titleText.text, // hente ut title fra API
            year: data.results && data.results.releaseYear && data.results.releaseYear.year,
            genre: '',
            imageUrl: data.results && data.results.primaryImage && data.results.primaryImage.url, // Hente ut imageUrl fra API
          };
        }).filter(Boolean) // Filtrerer ut null values
      );
  
      //console.log('Updated movies:', updatedMovies); // log Filmobject
      setMovies((prevMovies) => [...prevMovies, ...updatedMovies]); // Oppdatere filmene med den nye dataen
    } catch (error) {
      console.error('Error fetching movie data from API:', error);
    }
  };
  
  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie, index) => {
          //console.log("Movie data:", movie); // Log hvert movie objekt
          // Sjekke at alle objekter har disse tre
          const hasContent = movie.title || movie.genre || movie.imageUrl;
          //Rendere ut denne ul'en hvis objektet har alt inni hasContent
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
              {movie.genre && (
                <li className="movieItem">
                  <p>{movie.genre}</p>
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

export default MovieCard;*/


import React, { useState, useEffect } from 'react'
import { client } from '../../sanity/client'

export default function MovieCard() {
  const [movies, setMovies] = useState([])
  const [fetchedImdbIds, setFetchedImdbIds] = useState(new Set()) //Kilde??

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const sanityData = await client.fetch('*[_type == "films"]{ title, genre, imdbid }')
        const imdbIds = sanityData.map(({ imdbid }) => imdbid)
        const newImdbIds = imdbIds.filter(imdbId => !fetchedImdbIds.has(imdbId))
        fetchMovieDataFromAPI(newImdbIds);
      } catch (error) {
        console.error('Error fetching movie data from Sanity:', error)
      }
    }
    fetchMovies()
  }, [])

  const fetchMovieDataFromAPI = async (imdbIds) => {
    try {
      //Kilde til promise??
      const updatedMovies = await Promise.all(
        imdbIds.map(async (imdbid) => {
          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          })
          const { results } = await response.json()
          if (fetchedImdbIds.has(imdbid)) return null
          setFetchedImdbIds(prevImdbIds => new Set([...prevImdbIds, imdbid]))
          return {
            imdbid,
            title: results?.titleText?.text,
            year: results?.releaseYear?.year,
            genre: '',
            imageUrl: results?.primaryImage?.url,
          }
        }).filter(Boolean)
      )
      setMovies(prevMovies => [...prevMovies, ...updatedMovies])
    } catch (error) {
      console.error('Error fetching movie data from API:', error)
    }
  }

  const MovieItem = ({ movie }) => (
    <li className="movieItem">
      {movie.title && (
        <h2>
          <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
            {movie.title} ({movie.year})
          </a>
        </h2>
      )}
      {movie.genre && <p>{movie.genre}</p>}
      {movie.imageUrl && (
        <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
          <img src={movie.imageUrl} alt={movie.title} />
        </a>
      )}
    </li>
  )

  return (
    <div>
      {movies.length > 0 ? (
        <ul className="movieCard">
          {movies.map((movie, index) => (
            <MovieItem key={index} movie={movie} />
          ))}
        </ul>
      ) : (
        <p>Vennligst vent mens jeg laster meg ferdig..:D</p>
      )}
    </div>
  )
}