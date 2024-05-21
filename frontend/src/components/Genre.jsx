import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../sanity/client'
import MovieCard from './MovieCard'

export default function Genre() {
  const { genre } = useParams()
  const [films, setFilms] = useState([])
  const [movieCount, setMovieCount] = useState(0)

  useEffect(() => {
    const filmGenre = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "films" && genre == $genre]{ title, genre, imdbid }`,
          { genre }
        );

        setMovieCount(data.length)

        const imdbIds = data.map(film => film.imdbid)
        setFilms(imdbIds);
      } catch (error) {
        console.error('Klarte ikke å hente filmer', error)
      }
    }

    filmGenre()
  }, [genre])

  return (
    <main>
      <h2>Filmer i sjangeren: {genre} ({movieCount})</h2>
      <article className='genreCard'>
      <MovieCard movies={films} type="genre" />
      </article>
    </main>
  )
}