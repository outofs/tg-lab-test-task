import { useState, useEffect } from "react";

import "./App.css";
import SearchField from "./components/SearchField";
import { getWeatherData } from "./api/weatherAPI";
import type { WeatherData } from "./types/weaterData";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import HourlyWeatherInfo from "./components/HourlyWeatherInfo";
import WeeklyForecastInfo from "./components/WeeklyForecastInfo";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("Kyiv");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const loadWeatherData = async (city: string) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(city);
  }, [city]);

  return (
    <div className="app">
      <div className="container">
        <SearchField city={city} setCity={setCity} isLoading={isLoading} />
        {isLoading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <>
            <CurrentWeatherInfo
              location={weatherData.location}
              current={weatherData.current}
              forecastDay={weatherData.forecast.forecastday[0]}
            />
            {/* <HourlyWeatherInfo
              forecastDay={weatherData.forecast.forecastday[0]}
              current={weatherData.current}
            /> */}
            <WeeklyForecastInfo
              forecastDays={weatherData.forecast.forecastday}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
