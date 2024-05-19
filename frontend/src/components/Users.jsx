import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../sanity/client";
import { useUser } from "./UserContext";

export default function Users(){
    const [users, setUsers] = useState([]);
    const { currentUser, setUser } = useUser();

  // Kilde: https://www.sanity.io/docs/js-client
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ _id, name}')
        setUsers(userData)
      } catch (error) {
        console.error('Klarte ikke å hente brukere', error)
      }
    }

    getUsers()
  }, [])

  const handleUserSelect = (userId) => {
    setUser(userId)
  }

  const otherUsers = users.filter(user => user._id !== currentUser?._id);
    
    return(
        <>
         <div>
          <ul>
            {otherUsers.map((user, index) => (
              <li key={index} onClick={() => handleUserSelect(user._id)}>
                {user.name}</li>
            ))}
          </ul>
        </div>  
        </>
    )
}