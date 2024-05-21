import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from "../../sanity/client";

//Kilde på UserContext: https://medium.com/@liv_blogs/how-to-implement-user-switching-7cf0713bff65 , https://www.back4app.com/docs/react/working-with-users/get-current-user-react
const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    /*En bruker blir lagret i localStorage når man logger den inn. Må slette bruker id'en i
    Application for å få opp alle tre etter første innlogging, og deretter refreshe.
    https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */
    useEffect(() => {
        const loadCurrentUser = async () => {
            const savedUserId = localStorage.getItem('selectedUserId')
            if (savedUserId) {
                await fetchUserData(savedUserId)
            }
        }

        loadCurrentUser()
    }, [])

    //Bruker Groq-spørring for å hente id, navn, ønskeliste og favorittliste https://www.sanity.io/docs/query-cheat-sheet
    const fetchUserData = async (userId) => {
        const query = `*[_type == "user" && _id == $userId]{ _id, name, wishlist, favorites, favoriteGenres}`
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

