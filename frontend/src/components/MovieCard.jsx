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