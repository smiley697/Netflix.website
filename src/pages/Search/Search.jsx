import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const Search = () => {
  const q = useQuery().get('q') || '';
  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU2NjM3N2Q3MGMxYjY3YjJhOGU3ZTMyNDlkZDJmZiIsIm5iZiI6MTc1NTYxMTQ0MC43ODksInN1YiI6IjY4YTQ4MTMwMTlhYzg0YmRiOWRhNTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mo6bNlctjrTVQf87NvLsE0R4pciBYq3F-F8jV9OfC3c'
    }
  };

  useEffect(() => {
    if (!q) { setApiData([]); return; }
    fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(q)}&include_adult=false&language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));
  }, [q])

  return (
    <div>
      <Navbar/>
      <div style={{ paddingTop: 100, paddingLeft: '6%', paddingRight: '6%' }}>
        <h2>Search results for "{q}"</h2>
        {!q && <p style={{ color: '#aaa' }}>Type something in the search box.</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {apiData.map((item) => (
            <Link key={(item.media_type || 'item') + item.id} to={`/player/${item.media_type === 'tv' ? 'tv' : 'movie'}/${item.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
              {item.backdrop_path || item.poster_path ? (
                <img src={'https://image.tmdb.org/t/p/w500' + (item.backdrop_path || item.poster_path)} alt='' style={{ width: '100%', borderRadius: 4 }} />
              ) : (
                <div style={{ height: 90, background: '#333', borderRadius: 4 }} />
              )}
              <p>{item.title || item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Search


