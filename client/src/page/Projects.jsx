import React from 'react'
import Header from "../components/Header"
import {Link} from 'react-router-dom'
import '../css/Projects.css'

function Projects() {
  return (
    <div>
        <Header/>
        <div className="projects-container">
        <Link to="/weather" className="project-box">Weather Forecast</Link>
        <Link to="/Calculator" className="project-box">Basic Calculator</Link>
        <Link to="/ToDoList" className="project-box">To-Do List</Link>
        <Link to="/Countdown-timer" className="project-box">Countdown Timer</Link>
        <Link to="/BMI-Calculator" className="project-box">BMI Calculator</Link>
        <Link className="project-box">FruitSource</Link>
      </div>
        
        
    </div>
  )
}

export default Projects
