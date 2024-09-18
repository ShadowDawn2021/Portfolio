import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'

function BmiCalculator() {
  const [name,setName] = useState('')
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [records, setRecords] = useState([]);
  const [unit, setUnit] = useState('kg');

 

  const calculateBMI = async () => {
    try {
      const weightInKg = unit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 2.20462;
      const response = await axios.post('http://localhost:8080/api/bmi', {
        height: parseFloat(height),
        weight: weightInKg,
        name: name
      });
      setBmi(response.data.bmi);
      fetchBMIRecords();
    } catch (err) {
      console.error('Error calculating BMI:', err);
    }
  };

  const toggleUnit = () => {
    if (unit === 'kg') {
      setUnit('lb');
      setWeight((prevWeight) => (parseFloat(prevWeight) * 2.20462).toFixed(2));
    } else {
      setUnit('kg');
      setWeight((prevWeight) => (parseFloat(prevWeight) / 2.20462).toFixed(2));
    }
  };

  const fetchBMIRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bmi');
      setRecords(response.data);
    } catch (err) {
      console.error('Error fetching BMI records:', err);
    }
  };

  useEffect(()=>{
    fetchBMIRecords()
  },[])


  const deleteRecord = (id) =>{
    axios.delete(`http://localhost:8080/api/bmi/delete/${id}`)
    .then(()=>{
      setRecords(records.filter(record => record._id !== id));
      
    }).catch((err)=>{
      console.error(err)
    });
  }

  return (
    <div>
      <Header/>
      <div>
      <h1>BMI Calculator</h1>
      <input 
        type="text"
        placeholder='name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
       />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder={`Weight (${unit})`}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button onClick={toggleUnit}>
        Switch to {unit === 'kg' ? 'lb' : 'kg'}
      </button>

      {bmi && (
          <div>
            <h2>Your BMI is: <span>{bmi.toFixed(2)}</span></h2>
          </div>
        )}

      <h2>BMI Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
           Name: {record.name}, Height: {record.height} cm, Weight: {record.weight} kg, BMI: {record.bmi.toFixed(2)} (Calculated on: {new Date(record.date).toLocaleString()})
           <button onClick={()=>deleteRecord(record._id)}>Delete</button>
           
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default BmiCalculator
