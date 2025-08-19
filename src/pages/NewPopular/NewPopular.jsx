import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'

const NewPopular = () => {
  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU2NjM3N2Q3MGMxYjY3YjJhOGU3ZTMyNDlkZDJmZiIsIm5iZiI6MTc1NTYxMTQ0MC43ODksInN1YiI6IjY4YTQ4MTMwMTlhYzg0YmRiOWRhNTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mo6bNlctjrTVQf87NvLsE0R4pciBYq3F-F8jV9OfC3c'
    }
  };

  useEffect(() => {
    Promise.all([
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options).then(r => r.json()),
      fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options).then(r => r.json())
    ]).then(([movies, tv]) => {
      const items = [...(movies.results || []), ...(tv.results || [])].slice(0, 20)
      setApiData(items)
    }).catch(console.error)
  }, [])

  return (
    <div>
      <Navbar/>
      <div style={{ paddingTop: 100, paddingLeft: '6%', paddingRight: '6%' }}>
        <h2>New & Popular</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {apiData.map((item) => (
            <Link key={(item.media_type || (item.title ? 'movie' : 'tv')) + item.id} to={`/player/${item.title ? 'movie' : 'tv'}/${item.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
              <img src={'https://image.tmdb.org/t/p/w500' + item.backdrop_path} alt='' style={{ width: '100%', borderRadius: 4 }} />
              <p>{item.title || item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default NewPopular


