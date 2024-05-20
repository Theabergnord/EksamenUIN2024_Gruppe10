import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from "../../sanity/client";

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const loadCurrentUser = async () => {
            const savedUserId = localStorage.getItem('selectedUserId')
            if (savedUserId) {
                await fetchUserData(savedUserId)
            }
        }

        loadCurrentUser()
    }, [])

    const fetchUserData = async (userId) => {
        const query = `*[_type == "user" && _id == $userId]{ _id, name, wishlist }`
        const params = { userId: userId }
        try {
            const users = await client.fetch(query, params);
            if (users.length > 0) {
                setCurrentUser(users[0]);
            }
        } catch (error) {
            console.error('Kunne ikke hente brukere', error)
        }
    }

    const setUser = async (userId) => {
        localStorage.setItem('selectedUserId', userId)
        await fetchUserData(userId)
    }

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)

