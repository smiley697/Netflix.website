import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../firebase'

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(()=> {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[])

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setShowSearch(false);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch {}
    navigate('/login');
  };

  return (
    <div className='Navbar' ref={navRef}>
        <div className="Navbar-left">
        <Link to='/' onClick={() => setShowMobileMenu(false)}>
          <img src={logo} alt=""/>
        </Link>
        <ul>
            <li><Link to='/' onClick={() => setShowMobileMenu(false)}>Home</Link></li>
            <li><Link to='/tv' onClick={() => setShowMobileMenu(false)}>Tv Shows</Link></li>
            <li><Link to='/movies' onClick={() => setShowMobileMenu(false)}>Movies</Link></li>
            <li><Link to='/new' onClick={() => setShowMobileMenu(false)}>New & Popular</Link></li>
            <li><Link to='/my-list' onClick={() => setShowMobileMenu(false)}>My List</Link></li>
        </ul>
        <button className="Navbar-burger" aria-label="Open menu" onClick={() => setShowMobileMenu(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        </div>
        <div className="Navbar-right">
            <img src={search_icon} alt="" className="icon" onClick={() => setShowSearch((v) => !v)} />
            {showSearch && (
              <form className="search-form" onSubmit={onSubmitSearch}>
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </form>
            )}
            <p>Children</p>
            <img src={bell_icon} alt="" className="icon" />
            <div className="Navbar-profile">
              <img src={profile_img} alt="" className="profile" />
              <img src={caret_icon} alt="" />
            <div className="dropdown">
                <p onClick={handleSignOut}>Sign out of Netflix</p>
            </div>
            </div>
        </div>

        {showMobileMenu && (
          <>
            <div className="mobile-menu-backdrop" onClick={() => setShowMobileMenu(false)}></div>
            <nav className="mobile-menu">
              <button className="close" aria-label="Close menu" onClick={() => setShowMobileMenu(false)}>×</button>
              <ul>
                <li><Link to='/' onClick={() => setShowMobileMenu(false)}>Home</Link></li>
                <li><Link to='/tv' onClick={() => setShowMobileMenu(false)}>Tv Shows</Link></li>
                <li><Link to='/movies' onClick={() => setShowMobileMenu(false)}>Movies</Link></li>
                <li><Link to='/new' onClick={() => setShowMobileMenu(false)}>New & Popular</Link></li>
                <li><Link to='/my-list' onClick={() => setShowMobileMenu(false)}>My List</Link></li>
                <li><button className='signout' onClick={() => { setShowMobileMenu(false); handleSignOut(); }}>Sign out</button></li>
              </ul>
            </nav>
          </>
        )}
    </div>
  )
}

export default Navbar 
