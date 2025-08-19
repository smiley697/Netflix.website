import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TvShows from './pages/TvShows/TvShows'
import Movies from './pages/Movies/Movies'
import NewPopular from './pages/NewPopular/NewPopular'
import MyList from './pages/MyList/MyList'
import Search from './pages/Search/Search'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {


  const navigate = useNavigate();

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/tv' element={<TvShows/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/new' element={<NewPopular/>}/>
        <Route path='/my-list' element={<MyList/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/player/:type/:id' element={<Player/>}/>
      </Routes>
      
    </div>
  )
}

export default App
