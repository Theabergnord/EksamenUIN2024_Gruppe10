// Home.jsx
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { client } from "../../sanity/client";
import { useUser } from "./UserContext";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ name }');
        setUsers(userData)
      } catch (error) {
        console.error('Klarte ikke å hente brukere', error);
      }
    }
    getUsers()
  }, [])

    return(
      /* 
      Utseende: Dersom du ønsker kan du endre "se sammen" til aside, dersom den skal ligge på siden istedenfor. Endre sass.*/
        <>
        <h2>Hei, {currentUser ? currentUser.name : 'gjest'}</h2>

        <div>
          <h3>Se sammen med:</h3>
          <ul>
            {users.map((user, index) => (
              <li className="users" key={index}>{user.name}</li>
            ))}
          </ul>
        </div>  

      <div>
        <h3>Favoritter:</h3>
      </div>

      {wishlist.length > 0 && ( // Conditionally render MovieCard only if there are items in the wishlist
        <>
          <h3>Ønskeliste:</h3>
          <div className="movieList">
            <MovieCard wishlist={wishlist} /> {/* Pass the wishlist as a prop */}
          </div>
        </>
      )}
    </>
  );
}
