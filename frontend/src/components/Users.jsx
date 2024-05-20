import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../sanity/client";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Users(){
    const [users, setUsers] = useState([]);
    const { currentUser, setUser } = useUser();

    //Kilde: useNavigate: https://medium.com/@bobjunior542/using-usenavigate-in-react-router-6-a-complete-guide-46f51403f430 , https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
    const navigate = useNavigate()

  //Kilde: https://www.sanity.io/docs/js-client
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

  const handleUserSelect = async (userId) => {
    await setUser(userId)
    navigate('/')
  }

  const otherUsers = users.filter(user => user._id !== currentUser?._id);
    
    return(
        <>
         <main>
          <h2>Logg inn som:</h2>
          <ul>
            {otherUsers.map((user, index) => (
              <li key={index} onClick={() => handleUserSelect(user._id)}>
                {user.name}</li>
            ))}
          </ul>
        </main>  
        </>
    )
}