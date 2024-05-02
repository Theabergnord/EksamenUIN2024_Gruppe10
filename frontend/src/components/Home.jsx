import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchAllUsers } from "../../sanity/services/userService";


export default function Home(){

  const [active, setActive] = useState()
  const [userList, setUserList] = useState(null)  

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUserList(data)
    }
    
    useEffect(()=>{
        console.log(active)
        getAllUsers()
    }, [active])

    console.log(userList)
    
    return(
        <>

        <h2>Hei 
      {userList?.map((user, index) => (
        <section key={index}>
          <h2>{user.name}</h2>
          <img src={user.image} />
        </section>
      ))}
    </h2>
        <div className="movieList">
          <MovieCard />
          <MovieCard />
        </div>
        
  
        </>
    )
}