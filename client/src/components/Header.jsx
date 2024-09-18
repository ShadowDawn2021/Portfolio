import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import "../css/Header.css"


function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='navbar'>
      <div className='brand'>Portfolio</div>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to='/'>Home</Link>
        <Link to='/projects'>Projects</Link>
        <Link >Resume</Link>
      </div>
      <div className='burger-menu' onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Header
