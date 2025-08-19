import React, { useEffect, useRef, useState } from 'react'
import './TitileCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'





const TitileCards = ({title, category}) => {
  
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU2NjM3N2Q3MGMxYjY3YjJhOGU3ZTMyNDlkZDJmZiIsIm5iZiI6MTc1NTYxMTQ0MC43ODksInN1YiI6IjY4YTQ4MTMwMTlhYzg0YmRiOWRhNTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mo6bNlctjrTVQf87NvLsE0R4pciBYq3F-F8jV9OfC3c'
  }
};


const handleWheel =(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results || []))
  .catch(err => console.error(err));

  const el = cardsRef.current;
  el && el.addEventListener('wheel', handleWheel, { passive: false });
  return () => {
    el && el.removeEventListener('wheel', handleWheel);
  };
},[category])


  return (
    <div className='Titile-Cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/movie/${card.id}`} className='card' key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt=''/>
            <p>{card.original_title || card.name}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitileCards
