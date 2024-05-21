import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/client';

function MovieCard({ movies, type }) {
  const [movieDetails, setMovieDetails] = useState([]);

  //Kilde: For å unngå at samme film blir hentet flere ganger https://stackoverflow.com/questions/58806883/how-to-use-set-with-reacts-usestate
  const [fetchedImdb, setFetchedImdb] = useState(new Set())

  useEffect(() => {
    if (!movies || movies.length === 0) return 

      //Henter filmer fra Sanity basert på id'ene fra IMDB
      const fetchMovies = async () => {
        try {
          const sanityData = await client.fetch('*[_type == "films" && imdbid in $imdbIds]{ title, genre, imdbid }', { imdbIds: movies })
          const imdbIds = sanityData.map(({ imdbid }) => imdbid);
          const newImdb = imdbIds.filter(imdbId => !fetchedImdb.has(imdbId))
          await fetchMovieData(newImdb)
        } catch (error) {
          console.error('Klarte ikke hente filmer')
        }
      }
    
      fetchMovies()
    }, [movies, type])

 
  const fetchMovieData = async (imdbIds) => {
    try {
      //Kjører en for loop for hver imdb-id, og hopper over de id'ene som allerede er hentet https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue 
      for (const imdbid of imdbIds) {
        if (fetchedImdb.has(imdbid)) {
          continue;
        }

          //Setter en timeout for å unngå "429 Too Many Requests" i consollen https://www.linkedin.com/pulse/nodejs-16-settimeout-asyncawait-igor-gonchar/
          await new Promise(resolve => setTimeout(resolve, 2000))

          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          });

        //Fått hjelp fra ChatGPT til forslag for hvordan hente data fra API og lagre dataen i en variabel. Prompts ligger i refleksjonsdokument.
        const data = await response.json();
        const newMovie = {
          imdbid,
          title: data.results?.titleText?.text,
          year: data.results?.releaseYear?.year,
          genre: '',
          imageUrl: data.results?.primaryImage?.url,
        }

        //Oppdaterer liste over filmer for å unngå å få dobbelt opp. Kilde til Map, Array og set.: https://playcode.io/javascript/map-set , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        setMovieDetails((prevMovies) => {
          const movieMap = new Map(prevMovies.map(movie => [movie.imdbid, movie]))
          movieMap.set(newMovie.imdbid, newMovie)
          return Array.from(movieMap.values())
        })

        setFetchedImdb((prevImdbIds) => new Set([...prevImdbIds, imdbid]))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
  <>
      {movieDetails.length > 0 ? (
        movieDetails.map((movie) => {
          const hasContent = movie.title || movie.genre || movie.imageUrl;
          return hasContent && (
            <article className="movieCard" key={movie.imdbid}>
              {movie.title && (
                  <h3>
                    <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                      {movie.title} ({movie.year})
                    </a>
                  </h3>
              )}
              {movie.imageUrl && (
                  <a href={`https://www.imdb.com/title/${movie.imdbid}`} target="_blank" rel="noopener noreferrer">
                    <img src={movie.imageUrl} alt={movie.title} />
                  </a>
              )}
            </article>
          )
        })
      ) : (
        <p>Vennligst vent mens jeg laster meg ferdig..:D</p>
      )}
  </>
  );
}

export default MovieCard;
