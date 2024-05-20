import React, { useState, useEffect } from 'react'
import { client } from '../../sanity/client'
import { Link } from 'react-router-dom'

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
    <>
    <div className='genre'>
      <h2>Samleside for sjangere:</h2>
      <ul>
            {genre.map((g) => (
              <li key={g.genre}><Link to={`/genres/${g.genre}`}>{g.genre}</Link>
              <button>Legg til som favoritt</button>
              </li>
            ))}
            </ul>
            
    </div>
    </>
  )
}