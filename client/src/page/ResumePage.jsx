import React from 'react'
import Header from '../components/Header'
import resumeImg from '../assets/resume.jpg'
import '../css/ResumePage.css'

function ResumePage() {
  return (
    <div>
        <Header/>
        <img className='resumeImg' src={resumeImg} alt="" />
    </div>
  )
}

export default ResumePage
