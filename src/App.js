import React, { useState } from 'react';
import './App.css'

function App() {

  const apiKey = 'b6d749551c276f3c6316b149a28912a6';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }
  return (
    <div className='container'>
      <div className='wrapper'>
      <input
        className='input'
        placeholder='Enter a city name'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyDown={getWeather}
      />

    {typeof weatherData.main === 'undefined' ? (
      <div>
        <p>Welcome to weather app! Enter in a city to get the weather of.</p>
      </div>
      ) : (
        <div className='wrapperResult'>
          <p className='cityName'>{weatherData.name}</p>
          <p className='cityTemp'>{Math.round(weatherData.main.temp)}℃</p>
          <p>{weatherData.weather[0].main}</p>
        </div>
      )
    }

    {weatherData.cod === '404' ? (
      <p>City not found</p>
    ) : (
      <>
      </>
    )}

      </div>
    </div>
  )
}

export default App