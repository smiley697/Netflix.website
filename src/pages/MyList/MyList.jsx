import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

// Placeholder local list – in a real app you'd persist and manage this list in state or storage
const MyList = () => {
  return (
    <div>
      <Navbar/>
      <div style={{ paddingTop: 100, paddingLeft: '6%', paddingRight: '6%' }}>
        <h2>My List</h2>
        <p style={{ color: '#aaa' }}>You haven't added any titles yet.</p>
      </div>
      <Footer/>
    </div>
  )
}

export default MyList


