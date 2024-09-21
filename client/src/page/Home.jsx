import React from 'react';
import '../css/Home.css';
import profilePic from '../assets/profilePic.jpg';
import Header from "../components/Header"

function Home() {
  return (
    
    <div className='container'>
      <Header/>
      <div className='text-container'>
        <h1>Christian Avery Calayag</h1>
        <h2>Junior Web Developer</h2>
        <i className='quote'>"My knowledge, skills, and ChatGPT against the world—embracing technology to stay efficient in the fast-paced world of innovation."</i>

      </div>
      <div className='image-container'>
        <img className='profilePicture' src={profilePic} alt="Profile Picture" />
      </div>
    </div>
  );
}

export default Home;
