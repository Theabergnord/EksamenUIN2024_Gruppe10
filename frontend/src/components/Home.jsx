import React from "react";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../sanity/client";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";


export default function Home(){
  const [users, setUsers] = useState([]);
  const { currentUser } = useUser();

  //Kilde: useNavigate: https://medium.com/@bobjunior542/using-usenavigate-in-react-router-6-a-complete-guide-46f51403f430 , 
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/users')
    }
  }, [currentUser, navigate])

  // Kilde: https://www.sanity.io/docs/js-client
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ _id, name }');
        setUsers(userData)
      } catch (error) {
        console.error('Klarte ikke å hente brukere', error);
      }
    }
    getUsers()
  }, [])


  const otherUsers = users.filter(user => user._id !== currentUser?._id);

    return(
      /* 
      Utseende: Dersom du ønsker kan du endre "se sammen" til aside, dersom den skal ligge på siden istedenfor. Endre sass.*/
        <>
        <h2>Hei, {currentUser ? currentUser.name : 'Logg inn'}</h2>

        <div>
          <h3>Se sammen med:</h3>
          <ul>
            {otherUsers.map((user, index) => (
              <li className="users" key={index}>{user.name}</li>
            ))}
          </ul>
        </div>  

        <div>
          <h3>Favoritter:</h3>
        </div>


      {/*Overskrift skal inn i div. Må endre på sass slik at det legger seg riktig.*/}
        <h3>Ønskeliste:</h3>
        <div className="movieList">
        <MovieCard/>
        </div>
        
        </>
    )
}