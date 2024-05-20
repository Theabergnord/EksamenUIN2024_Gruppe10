import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/users');
    } 
  }, [currentUser, navigate]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ _id, name }');
        setUsers(userData);
      } catch (error) {
        console.error("Klarte ikke å hente brukere", error);
      }
    };
    getUsers();
  }, []);

  const otherUsers = users.filter((user) => user._id !== currentUser?._id);

  const updatePage = (selectedUserName) => {
    navigate(`/comparison/${currentUser.name}_${selectedUserName}`);
    //Page refresh
    window.location.reload();
    //https://www.freecodecamp.org/news/javascript-refresh-page-how-to-reload-a-page-in-js/
  };

  return (
    <>
      <h2>Hei, {currentUser ? currentUser.name : "Logg inn"}</h2>

      <div>
        <h3>Se sammen med:</h3>
        <ul>
          {otherUsers.map((user) => (
            <Link
              to={window.location.pathname}
              key={user._id}
              onClick={() => window.location.reload()}
            >
              <li className="users" onClick={() => updatePage(user.name)}>
                {user.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <section className="movieList_container">
        {currentUser && currentUser.favorites && currentUser.favorites.length > 0 && (
          <div className="movieList_section">
            <h3>Favoritter:</h3>
            <MovieCard movies={currentUser.favorites} type="favorites" />
            {/* Sender favorites som en prop */}
          </div>
        )}

        {/*Overskrift skal inn i div. Må endre på sass slik at det legger seg riktig.*/}
        {currentUser && currentUser.wishlist && currentUser.wishlist.length > 0 && (
          <div className="movieList_section">
            <h3>Ønskeliste:</h3>
            <MovieCard movies={currentUser.wishlist} type="wishlist" />
            {/* Sender wishlist som en prop */}
          </div>
        )}
      </section>
    </>
  );
}
