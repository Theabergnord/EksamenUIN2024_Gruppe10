import React, { useState, useEffect } from 'react'

//Kilde: Generelt oppsett fra forelesningsoppgaver, arbeidskrav og dokumentasjon fra API'et.

const Genre = () => {
  const [data, setData] = useState([])

  const getData = async () => {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '38f78b4c53mshba9eae8e9b528d4p1477e5jsn8b31042e4a1c',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    }

    try {
      const response = await fetch(url, options)
      const responseData = await response.json()
      let genres = responseData.results

      //Fjernet det første "tomme" objektet Kilde: https://www.geeksforgeeks.org/remove-empty-elements-from-an-array-in-javascript/
      genres = genres.filter((genre, index) => index !== 0 || genre !== null)

      setData(genres)
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h2>Samleside for sjangere:</h2>
      <ul>
        {data.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  )
}

export default Genre;