import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'


const Footer = () => {
  return (
    <div className='Footer'>
      <div className='footer-icon'>
        <img src={facebook_icon}alt='' />
        <img src={instagram_icon}alt='' />
        <img src={twitter_icon}alt='' />
        <img src={youtube_icon}alt='' />
      </div>
      <ul>
        <li>Audi Description</li>
        <li>Help Center</li>
        <li>Gift Cards </li>
        <li>Media Centre</li>
        <li>Invertor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>cookie Prefernces</li>
        <li>Corporate Informations</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>@ 1997-2024 Nefflix, Inc.</p>
    </div>
  )
}

export default Footer
