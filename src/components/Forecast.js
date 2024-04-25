import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import { API_KEY } from "./constants";

function Forecast({ weather }) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  
  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };
  
  return (
    <div>
      <div className="city-name">
        <h2>
          {data?.name}, <span>{data?.sys?.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data?.weather?.[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/w/${data.weather?.[0]?.icon}.png`}
            alt={data?.weather?.[0]?.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data?.main?.temp)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"}
        </sup>
      </div>
      <p className="weather-des">{data?.weather?.[0]?.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div>
            <p className="wind">{data?.wind?.speed}m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div>
            <p className="humidity">{data?.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
