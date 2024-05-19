// Users.jsx

import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/client';
import { useUser } from './UserContext';

export default function Users(){
    const [users, setUsers] = useState([]);
    const { setUser } = useUser();

  // Fetch users fra Sanity
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await client.fetch('*[_type == "user"]{ _id, name}');
        setUsers(userData)
      } catch (error) {
        console.error('Klarte ikke å hente brukere', error);
      }
    };

    getUsers();
  }, []);

  // Set selected user in UserContext
  const handleUserSelect = (userId) => {
    setUser(userId)
  }
    
    return(
        <>
         <div>
          <ul>
            {users.map((user, index) => (
              <li key={index} onClick={() => handleUserSelect(user._id)}>
                {user.name}</li>
            ))}
          </ul>
        </div>  
        </>
    )
}
