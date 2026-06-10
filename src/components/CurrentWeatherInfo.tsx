import React from "react";
import type {
  CurrentWeather,
  ForecastDay,
  Location,
} from "../types/weaterData";

type Props = {
  location: Location;
  current: CurrentWeather;
  forecastDay: ForecastDay;
};

const CurrentWeatherInfo = ({ location, current, forecastDay }: Props) => {
  return (
    <div className="card current-weather-info">
      <div className="current-weather-info__main">
        <div>
          <h2>{location.name}</h2>
          <h1 className="temperature">{forecastDay.day.avgtemp_c}°C</h1>
          <p>Max: {forecastDay.day.maxtemp_c}°C</p>
          <p>Min: {forecastDay.day.mintemp_c}°C</p>
          <p>Feels like: {current.feelslike_c}°C</p>
        </div>
        <div className="condition">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            height={64}
          />
          <p>{current.condition.text}</p>
        </div>
      </div>

      <div className="current-weather-info__details">
        <div className="detail-item">
          <span>Humidity: </span>
          <span>{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Wind: </span>
          <span>{current.wind_kph} kph</span>
        </div>
        <div className="detail-item">
          <span>Precipitation: </span>
          <span>{current.precip_mm} mm</span>
        </div>
        <div className="detail-item">
          <span>UV Index: </span>
          <span>{current.uv}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherInfo;
