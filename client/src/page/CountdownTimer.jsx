import React, { useState, useEffect }  from 'react'
import Header from '../components/Header'
import axios from 'axios';

function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    fetchTimer();
    const interval = setInterval(() => updateTimer(), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchTimer = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/timer');
      const endTime = new Date(response.data.endTime).getTime();
      setTimeRemaining(endTime - Date.now());
    } catch (err) {
      console.error('Error fetching timer:', err);
    }
  };

  const updateTimer = () => {
    setTimeRemaining((prev) => prev - 1000);
  };

  const setTimer = async () => {
    const endTime = new Date(Date.now() + newTime * 60000);
    try {
      await axios.post('http://localhost:8080/api/timer', { endTime });
      setTimeRemaining(endTime.getTime() - Date.now());
      setNewTime('');
    } catch (err) {
      console.error('Error setting timer:', err);
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "Time's up!";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <div>
      <Header/>
      <div>
      <h1>Countdown Timer</h1>
      <div>
        {timeRemaining !== null ? formatTime(timeRemaining) : 'Loading...'}
      </div>
      <input
        type="number"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        placeholder="Set minutes"
      />
      <button onClick={setTimer}>Set Timer</button>
      </div>
    </div>
  )
}

export default CountdownTimer
