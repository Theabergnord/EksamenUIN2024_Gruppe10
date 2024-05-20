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

  useEffect(() => {
    if (!currentUser) return;

    console.log('Comparison med:', userNames);

    const fetchSelectedUser = async () => {
      try {
        const nameParts = userNames.split('_');
        const selectedUserName = nameParts.find(name => name !== currentUser.name);

        if (!selectedUserName) {
          console.error('Selected user name not found in the URL');
          return;
        }

        const query = `*[_type == "user" && name == $userName]{ _id, name, wishlist }`;
        const params = { userName: selectedUserName };

        await new Promise(resolve => setTimeout(resolve, 1000));

        const users = await client.fetch(query, params);

        if (users.length > 0) {
          setSelectedUser(users[0]);
        } else {
          console.error('No user found with userNames:', userNames);
        }
      } catch (error) {
        console.error('Error fetching selected user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedUser();
  }, [userNames, currentUser]);

  if (loading) return <p>Loading...</p>;

  if (!currentUser) return <p>No current user found</p>;

  if (!selectedUser) return <p>No selected user found with userNames: {userNames}</p>;

  // Delay på moviecards, for å forhindre "too many api requests"
const MovieCardDelay = ({ wishlist }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2500); 

    return () => clearTimeout(delay);
  }, []);

  if (loading) return <p>Vennligst vent mens jeg laster meg ferdig..:D</p>;

  return <MovieCard wishlist={wishlist} />;
};


  return (
    <div className="comparison-container">
      <div className="user-column">
        <h2>{currentUser.name}'s ønskeliste</h2>
        <MovieCardDelay wishlist={currentUser.wishlist} />
      </div>
      <div className="user-column">
        <h2>{selectedUser.name}'s ønskeliste</h2>
        <MovieCardDelay wishlist={selectedUser.wishlist} />
      </div>
    </div>
  );
}
export default Comparison;
