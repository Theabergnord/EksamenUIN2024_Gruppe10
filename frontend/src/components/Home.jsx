import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
        console.error('Klarte ikke å hente brukere', error);
      }
    };
    getUsers();
  }, []);

  const otherUsers = users.filter(user => user._id !== currentUser?._id);

  return (
    <>
      <h2>Hei, {currentUser ? currentUser.name : 'Logg inn'}</h2>

      <div>
        <h3>Se sammen med:</h3>
        <ul>
          {otherUsers.map((user, index) => (
        <Link className="username" to={`/comparison/${currentUser.name}_${user.name}`} key={index}>
           <li className="users">
             {user.name}
           </li>
        </Link>
          ))}
        </ul>
      </div>

      <section className="movieList_container">
        <div className="movieList_section">
          <h3>Favoritter:</h3>
          {/*Må byttes ut med favorittliste!!!!!!!!!!!!*/}
          {/*<MovieCard wishlist={currentUser.wishlist} />*/}
        </div>

        {currentUser && currentUser.wishlist && currentUser.wishlist.length > 0 && (
          <>
            <div className="movieList_section">
              <h3>Ønskeliste:</h3>
              <MovieCard wishlist={currentUser.wishlist} />
            </div>
          </>
        )}
      </section>
    </>
  );
}
