import React, { useState, useEffect } from 'react'
import { writeClient } from '../../sanity/client'
import { Link } from 'react-router-dom'
import { FaRegStar, FaStar } from "react-icons/fa";
import { useUser } from './UserContext'

export default function Genres(){
  const { currentUser} = useUser();
  const [genre, setGenre] = useState([]);
  const [favoriteGenres, setFavoritesGenres] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const data = await writeClient.fetch('*[_type == "genre"]{ genre }')
        setGenre(data);
      } catch (error) {
        console.error('Klarte ikke å hente sjangere', error)
      }
    };

    getGenre()
  }, [favoriteGenres]);

  const handleFavorite = async (selectedGenre) => {
    try {
      const alreadyFavorite = favoriteGenres.includes(selectedGenre);
      
      let updatedGenres;
      if (alreadyFavorite) {
        updatedGenres = favoriteGenres.filter(genre => genre !== selectedGenre);
      } else {
        updatedGenres = [...favoriteGenres, selectedGenre]
      }
      setFavoritesGenres(updatedGenres);

      const selectedUserId = localStorage.getItem('selectedUserId');

      //Bruker writeClient.patch() for å oppdatere dokumentet i Sanity med favorittsjangre. Kilde: https://webtricks.blog/oppdatere-et-array-felt-i-en-innholdstype-i-sanity-fra-et-react-grensesnitt/ , https://playcode.io/javascript/map-set
      const updatedUser = await writeClient.patch(selectedUserId)
      .set({ favoriteGenres: updatedGenres})
      .commit();

      console.log("Oppdatert bruker:", updatedUser);
    } catch (error) {
      console.error("Error ved lagring av sjanger", error)
    }
  };

  return(
    <main className='genre'>
      <h2>Samleside for sjangere:</h2>
      <ul>
        {genre.map((g, index) => (
          <li key={g._id || index}>
            <Link to={`/genres/${g.genre}`}>{g.genre}</Link>

            {/*Kilde: Hvordan sjekke om knappen er klikket eller ikke og hvilken tekst som skal vises https://codedamn.com/news/reactjs/if-else-statements-in-jsx*/}
            <button className='favoriteGenre' onClick={() => handleFavorite(g.genre)}>
              {favoriteGenres.includes(g.genre) ? (
                <> Fjern fra favoritter <FaStar /> </>
              ) : (
                <> Legg til som favoritt <FaRegStar /> </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}