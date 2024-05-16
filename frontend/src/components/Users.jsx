import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../sanity/client";

export default function Users(){
    const [users, setUsers] = useState([])

  // Kilde: https://www.sanity.io/docs/js-client
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ name}')
        setUsers(userData)
      } catch (error) {
        console.error('Klarte ikke å hente brukere', error)
      }
    }

    getUsers()
  }, [])
    
    return(
        <>
         <div>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>  
        </>
    )
}