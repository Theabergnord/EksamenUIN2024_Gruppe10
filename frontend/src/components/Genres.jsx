import React, { useState, useEffect } from 'react'
import { client } from '../../sanity/client'
import { Link } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Genres(){
  const [genre, setGenre] = useState([])
  const [favoriteGenres, setFavoritesGenres] = useState([])

  useEffect(() => {
    const getGenre = async () => {
      try {
        const data = await client.fetch('*[_type == "genre"]{ genre}')
        setGenre(data)
      } catch (error) {
        console.error('Klarte ikke å hente sjangere', error)
      }
    }

    getGenre()
  }, [])

  const handleFavorite = (genre) => {
    setFavoritesGenres((prevFavorites) => [...prevFavorites, genre])
  }


  return(
    <div className='genre'>
      <h2>Samleside for sjangere:</h2>
      <ul>
        {genre.map((g) => (
          <li key={g.genre}>
            <Link to={`/genres/${g.genre}`}>{g.genre}</Link>

          {/*Kilde: Hvordan sjekke om knappen er klikket eller ikke https://codedamn.com/news/reactjs/if-else-statements-in-jsx*/}
            <button className='favoriteGenre' onClick={() => handleFavorite(g.genre)}>
              {favoriteGenres.includes(g.genre) ? (
                <> Favorittsjanger <FaStar /> </>
              ) : (
                <> Legg til som favoritt <FaRegStar /> </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}