import React, { useState, useEffect } from 'react';
import { writeClient } from '../../sanity/client';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { useUser } from './UserContext'; 

export default function Genres({}) {
  const { currentUser } = useUser();
  const [genre, setGenre] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const data = await writeClient.fetch('*[_type == "genre"]{ genre}');
        setGenre(data);
      } catch (error) {
        console.error('Failed to fetch genres', error);
      }
    };

    getGenre();
  }, [favoriteGenres]);

  const handleFavorite = async (selectedGenreName) => {
    try {
      const isAlreadyFavorite = favoriteGenres.includes(selectedGenreName);
  
      
      let updatedGenres;
      if (isAlreadyFavorite) {
        updatedGenres = favoriteGenres.filter(genre => genre !== selectedGenreName);
      } else {
        updatedGenres = [...favoriteGenres, selectedGenreName];
      }
      setFavoriteGenres(updatedGenres);
  
     
      const selectedUserId = localStorage.getItem('selectedUserId');
      const updatedUser = await writeClient.patch(selectedUserId)
        .set({ favoriteGenres: updatedGenres })
        .commit(); 
  
      console.log("Updated User:", updatedUser);
    } catch (error) {
      console.error("Error saving genre:", error);
    }
  };
  
  
  
  return (
    <div className='genre'>
      <h2>Genre Page:</h2>
      <ul>
        {genre.map((g, index) => (
          <li key={g._id || index}>
            <Link to={`/genres/${g.genre}`}>{g.genre}</Link>
            <button className='favoriteGenre' onClick={() => handleFavorite(g.genre)}>
              {favoriteGenres.includes(g.genre) ? (
                <> Remove from favorites <FaStar className='stjerne'/> </>
              ) : (
                <> Add to favorites <FaRegStar className='stjerne'/> </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
