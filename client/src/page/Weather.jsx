import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../css/Weather.css'

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/weather/current/${city}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Error in entered location or server error.');
      setWeather(null);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/weather/forecast/${city}`);
      setForecast(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch forecast data. Error in entered location or server error.');
      setForecast(null);
    }
  };

  return (
    <div className="weather-container">
      <Header />
      <div className="weather-content">
        <h1 className="weather-title">Weather API</h1>
        <div className="weather-input-container">
          <input
            className="weather-input"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="weather-button" onClick={fetchWeather}>
            Get Current Weather
          </button>
          <button className="weather-button" onClick={fetchForecast}>
            Get 5-Day Forecast
          </button>
        </div>

        {error && <p className="weather-error">{error}</p>}

        {weather && (
          <div className="weather-current">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}

        {forecast && (
          <div className="weather-forecast">
            <h2>5-Day Forecast for {forecast.city.name}, {forecast.city.country}</h2>
            {forecast.list.map((item, index) => (
              <div key={index} className="weather-forecast-item">
                <p>{new Date(item.dt_txt).toLocaleString()}</p>
                <p>Temperature: {item.main.temp} °C</p>
                <p>Weather: {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
