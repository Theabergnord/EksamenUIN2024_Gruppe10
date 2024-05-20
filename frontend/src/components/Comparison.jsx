import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../sanity/client';
import { useUser } from './UserContext';
import MovieCard from './MovieCard';

function Comparison() {
  const { currentUser } = useUser();
  const { userNames } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commonWishlist, setCommonWishlist] = useState([]);
  const [commonFavorites, setCommonFavorites] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!currentUser || fetching) return; 
    const fetchSelectedUser = async () => {
      try {
        //.split for å dele opp userNames fra url'en
        const nameParts = userNames.split('_');

        const selectedUserName = nameParts.find(name => name !== currentUser.name);
        //https://www.w3schools.com/jsref/jsref_find.asp

        if (!selectedUserName) {
          console.error('Selected user name not found in the URL');
          return;
        }
        
        const userInfo = `
          *[_type == "user" && name == $userName]{ 
            _id, 
            name, 
            wishlist,
            favorites
          }
        `;
        const name = { userName: selectedUserName };

        setFetching(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

        const users = await client.fetch(userInfo, name);

        if (users.length > 0) {
          setSelectedUser(users[0]);
          // filter for å finne felles ønskeliste filmer
          const commonWishlist = currentUser.wishlist.filter(movie => users[0].wishlist.includes(movie));
          setCommonWishlist(commonWishlist);
          // filter for å finne felles favorittfilmer
          const commonFavorites = currentUser.favorites.filter(movie => users[0].favorites.includes(movie));
          setCommonFavorites(commonFavorites);
        } 

      } finally {
        setLoading(false);
        setFetching(false);
      }
      //https://stackoverflow.com/questions/44251851/using-an-else-if-statement-with-in-a-try-catch-finally
    };

    fetchSelectedUser();
  }, [userNames, currentUser, fetching]); 

  if (loading) return <p>Laster...</p>;

  // Melding hvis ingen filmer matcher
  const noMatch = () => <p>Dere har ingen filmer til felles her..</p>;

  return (
    <div className="comparison-container">
      <h2 className='comparison-h2'>Utvalgte filmer for {currentUser.name} og {selectedUser.name}</h2>
      <section className="user-column">
        <h3>Felles ønskeliste</h3>
        {commonWishlist.length > 0 ? (
          <MovieCard movies={commonWishlist} />
        ) : (
          noMatch()
        )}
      </section>
      <section className="user-column">
        <h3>Felles favoritter</h3>
        {commonFavorites.length > 0 ? (
          <MovieCard movies={commonFavorites} />
        ) : (
          noMatch()
        )}
      </section>
    </div>
  );
}

export default Comparison;
