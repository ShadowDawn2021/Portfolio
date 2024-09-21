import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import '../css/BmiCalculator.css'

function BmiCalculator() {
  const [name, setName] = useState('');
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

  useEffect(() => {
    fetchBMIRecords();
  }, []);

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:8080/api/bmi/delete/${id}`)
      .then(() => {
        setRecords(records.filter(record => record._id !== id));
      }).catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="bmi-calculator-container">
      <Header />
      <div className="bmi-calculator-content">
        <h1 className="bmi-calculator-title">BMI Calculator</h1>
        <div className="bmi-calculator-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bmi-input name-input"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bmi-input height-input"
          />
          <input
            type="number"
            placeholder={`Weight (${unit})`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bmi-input weight-input"
          />
          <div className="bmi-buttons">
            <button onClick={calculateBMI} className="bmi-calculate-btn">Calculate BMI</button>
            <button onClick={toggleUnit} className="bmi-toggle-btn">
              Switch to {unit === 'kg' ? 'lb' : 'kg'}
            </button>
          </div>
        </div>

        {bmi && (
          <div className="bmi-result">
            <h2>Your BMI is: <span>{bmi.toFixed(2)}</span></h2>
          </div>
        )}

        <h2 className="bmi-records-title">BMI Records</h2>
        <ul className="bmi-records-list">
          {records.map((record) => (
            <li key={record._id} className="bmi-record-item">
              Name: {record.name}, Height: {record.height} cm, Weight: {record.weight} kg, BMI: {record.bmi.toFixed(2)} (Calculated on: {new Date(record.date).toLocaleString()})
              <button onClick={() => deleteRecord(record._id)} className="bmi-delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BmiCalculator;
