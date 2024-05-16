import React, { useState, useEffect } from 'react'
import { client } from '../../sanity/client'

export default function Genres(){
  const [genre, setGenre] = useState([])

  useEffect(() => {
    const getGenre = async () => {
      try {
        const data = await client.fetch('*[_type == "genre"]{ genre}')
        setGenre(data)
      } catch (error) {
        console.error('Klarte ikke å hente sjangere', error)
      }
    }

    getGenre()
  }, [])

  return(
    <div>
      <h2>Samleside for sjangere:</h2>
          <ul>
            {genre.map((genre, index) => (
              <li key={index}>{genre.genre}</li>
            ))}
          </ul>
            <ul>
      </ul>
    </div>
  )
}