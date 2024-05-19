import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../sanity/client'

export default function Genre() {
  const { genre } = useParams()
  const [films, setFilms] = useState([])

  useEffect(() => {
    const getFilmsByGenre = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "films" && genre == $genre]{
            title,
            genre,
            imdbid
          }`,
          { genre }
        );

        const filmsWithImages = await Promise.all(data.map(async (film) => {
          const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${film.imdbid}`, {
            headers: {
              'x-rapidapi-key': '73e3cd1c72msh82218700589087ap19bec3jsnf374b0a39515',
              'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
            },
          });
          const { results } = await response.json();
          return {
            ...film,
            imageUrl: results?.primaryImage?.url || null,
          };
        }));

        setFilms(filmsWithImages);
      } catch (error) {
        console.error('Klarte ikke å hente filmer', error)
      }
    }

    getFilmsByGenre()
  }, [genre])

  return (
    <div>
      <h2>Filmer i sjangeren: {genre}</h2>
      <ul className='movieCard'>
        {films.map((film) => (
          <li key={film.imdbid}>
            <h3>{film.title}</h3>
            {film.imageUrl && <img src={film.imageUrl} alt={film.title} />}
          </li>
        ))}
      </ul>
    </div>
  )
}