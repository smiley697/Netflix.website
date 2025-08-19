import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'

const TvShows = () => {
  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU2NjM3N2Q3MGMxYjY3YjJhOGU3ZTMyNDlkZDJmZiIsIm5iZiI6MTc1NTYxMTQ0MC43ODksInN1YiI6IjY4YTQ4MTMwMTlhYzg0YmRiOWRhNTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mo6bNlctjrTVQf87NvLsE0R4pciBYq3F-F8jV9OfC3c'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));
  }, [])

  return (
    <div>
      <Navbar/>
      <div style={{ paddingTop: 100, paddingLeft: '6%', paddingRight: '6%' }}>
        <h2>TV Shows</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {apiData.map((show) => (
            <Link key={show.id} to={`/player/tv/${show.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
              <img src={'https://image.tmdb.org/t/p/w500' + show.backdrop_path} alt='' style={{ width: '100%', borderRadius: 4 }} />
              <p>{show.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TvShows


