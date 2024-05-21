import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../sanity/client';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function Comparison() {
  const { currentUser } = useUser();
  const { userNames } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commonWishlist, setCommonWishlist] = useState([]);
  const [commonFavorites, setCommonFavorites] = useState([]);
  const [commonGenres, setCommonGenres] = useState([]);
  const [fetching, setFetching] = useState(false);
  //Fått hjelp med debouncedFetch fra chatgpt. prompts lenger ned i koden hvor dette blir brukt
  const [debouncedFetch, setDebouncedFetch] = useState(null);

  useEffect(() => {
    if (!currentUser || fetching) return; 
    const fetchSelectedUser = async () => {
      try {
        const names = userNames.split('_');
        const selectedUserName = names.find(name => name !== currentUser.name);

        if (!selectedUserName) {
          console.error('Selected user name not found in the URL')
          return;
        }
        
        const userInfo = `
          *[_type == "user" && name == $userName]{ 
            _id, 
            name, 
            wishlist,
            favorites,
            favoriteGenres
          }
        `;
        const name = { userName: selectedUserName };

        setFetching(true);

        const users = await client.fetch(userInfo, name);

        if (users.length > 0) {
          setSelectedUser(users[0]);

          // Filter for å finne felles ønskeliste
          //.includes method: https://www.tutorialspoint.com/filter-array-with-filter-and-includes-in-javascript
          const commonWishlist = currentUser.wishlist.filter(movie => users[0].wishlist.includes(movie));
          setCommonWishlist(commonWishlist);

          // Filter for å finne felles favorittfilmer
          const commonFavorites = currentUser.favorites.filter(movie => users[0].favorites.includes(movie));
          setCommonFavorites(commonFavorites);

          // Filter for å finne felles favorittsjanger
          const commonGenres = currentUser.favoriteGenres && users[0].favoriteGenres ? currentUser.favoriteGenres.filter(genre => users[0].favoriteGenres.includes(genre)) : [];
          setCommonGenres(commonGenres);
        } 

      } finally {
        setLoading(false);
        setFetching(false);
      }
    };
    //https://stackoverflow.com/questions/44251851/using-an-else-if-statement-with-in-a-try-catch-finally

     //Fått hjelp fra chatGPT med å bruke debounce.. prompt: "Do you have any suggestion to avoid too many fetches?" svar: ///*Debounce fetchSelectedUser function const timeoutId = setTimeout(fetchSelectedUser, 1000); return () => clearTimeout(timeoutId); }, [userNames, currentUser, fetching]); useEffect(() => { // Trigger a new fetch operation whenever userNames or currentUser changes if (userNames !== debouncedFetch) { setDebouncedFetch(userNames); } }, [userNames, debouncedFetch]);/*
    const timeoutId = setTimeout(fetchSelectedUser, 1000);
    return () => clearTimeout(timeoutId);

  }, [userNames, currentUser, fetching]); 

  useEffect(() => {
    if (userNames !== debouncedFetch) {
      setDebouncedFetch(userNames);
    }
  }, [userNames, debouncedFetch]);

  if (loading) return <p>Laster...</p>;

  // Melding hvis ingen filmer matcher
  const noMatch = () => <p>Dere har ingenting til felles her...</p>;

  return (
    <main className="comparison-container">
      <h2 className='comparison-h2'>Utvlagte filmer og sjangre for {currentUser.name} og {selectedUser?.name}</h2>
      <section className="user-column">
        <h3>Catch up!</h3>
        <p>Dere begge ønsker å se disse filmene</p>
        {commonWishlist.length > 0 ? (
          <MovieCard movies={commonWishlist} />
        ) : (
          noMatch()
        )}
      </section>
      <section className="user-column">
        <h3>Go safe!</h3>
        <p>Hva med en god favoritt for dere to?</p>
        {commonFavorites.length > 0 ? (
          <MovieCard movies={commonFavorites} />
        ) : (
          noMatch()
        )}
      </section>
      <section className="user-column">
        <h3>Utforsk</h3>
        <p>Dere liker begge disse sjangerene, noe å velge her?</p>
        {commonGenres.length > 0 ? (
          <ul>
          {commonGenres.map((genre, index) => (
            <Link className='genrecomparison' key={index} to={`/genres/${genre}`}>
              <li>
                {genre}
              </li>
            </Link>
          ))}
        </ul>
        ) : (
          noMatch()
        )}
      </section>
    </main>
  );
}

export default Comparison;
