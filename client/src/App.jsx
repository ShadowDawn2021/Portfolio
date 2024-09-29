import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./page/Home"
import Projects from "./page/Projects"
import Resume from "./page/ResumePage"
import Weather from "./page/Weather"
import Calculator from "./page/Calculator"
import BMI from "./page/BmiCalculator"
import ToDo from "./page/ToDo"
import Countdown from "./page/CountdownTimer"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
					<Route path="/" element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/Weather" element={<Weather/>}/>
          <Route path="/Calculator" element={<Calculator/>}/>
          <Route path="/BMI-Calculator" element={<BMI/>}/>
          <Route path="/ToDoList" element={<ToDo/>}/>
          <Route path="/Countdown-Timer" element={<Countdown/>}/>

				</Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
