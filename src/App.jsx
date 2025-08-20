import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TvShows from './pages/TvShows/TvShows'
import Movies from './pages/Movies/Movies'
import NewPopular from './pages/NewPopular/NewPopular'
import MyList from './pages/MyList/MyList'
import Search from './pages/Search/Search'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>Loading...</div>;
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <Routes>
        <Route path='/login' element={user ? <Navigate to="/" replace /> : <Login/>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/tv' element={<ProtectedRoute><TvShows/></ProtectedRoute>}/>
        <Route path='/movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path='/new' element={<ProtectedRoute><NewPopular/></ProtectedRoute>}/>
        <Route path='/my-list' element={<ProtectedRoute><MyList/></ProtectedRoute>}/>
        <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
        <Route path='/player/:type/:id' element={<ProtectedRoute><Player/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
