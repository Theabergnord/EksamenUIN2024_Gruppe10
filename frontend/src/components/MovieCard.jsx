import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/client';

function MovieCard({ wishlist }) {
  const [movies, setMovies] = useState([]);
  const [fetchedImdbIds, setFetchedImdbIds] = useState(new Set()) //Kilde???

  useEffect(() => {
    if (!wishlist || wishlist.length === 0) return 

      // Henter filmer basert på brukerens ønskeliste
      const fetchMovies = async () => {
        try {
          const sanityData = await client.fetch('*[_type == "films" && imdbid in $imdbIds]{ title, genre, imdbid }', { imdbIds: wishlist })
          const imdbIds = sanityData.map(({ imdbid }) => imdbid);
          const newImdbIds = imdbIds.filter(imdbId => !fetchedImdbIds.has(imdbId))
          await fetchMovieDataFromAPI(newImdbIds)
        } catch (error) {
          console.error('Error fetching movie data from Sanity:', error)
        }
      }
    
      fetchMovies()
    }, [wishlist])

 
  const fetchMovieDataFromAPI = async (imdbIds) => {
    try {
      for (const imdbid of imdbIds) {
        if (fetchedImdbIds.has(imdbid)) {
          continue;
        }

          //Kilde til promise????
          await new Promise(resolve => setTimeout(resolve, 1000))

          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          });

          const data = await response.json();
        const newMovie = {
          imdbid,
          title: data.results?.titleText?.text,
          year: data.results?.releaseYear?.year,
          genre: '',
          imageUrl: data.results?.primaryImage?.url,
        };

        setMovies((prevMovies) => {
          const movieMap = new Map(prevMovies.map(movie => [movie.imdbid, movie]))
          movieMap.set(newMovie.imdbid, newMovie)
          return Array.from(movieMap.values())
        });

        setFetchedImdbIds((prevImdbIds) => new Set([...prevImdbIds, imdbid]))
      }
    } catch (error) {
      console.error('Error fetching movie data from API:', error)
    }
  };

  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie) => {
          const hasContent = movie.title || movie.genre || movie.imageUrl;
          return hasContent && (
            <section className="movieCard" key={movie.imdbid}>
              {movie.title && (
                <article className="movieList">
                  <h2>
                    <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                      {movie.title} ({movie.year})
                    </a>
                  </h2>
                </article>
              )}
              {movie.imageUrl && (
                <article className="movieCard">
                  <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                    <img src={movie.imageUrl} alt={movie.title} />
                  </a>
                </article>
              )}
            </section>
          );
        })
      ) : (
        <p>Vennligst vent mens jeg laster meg ferdig..:D</p>
      )}
    </div>
  );
}

export default MovieCard;
