import { useState, useEffect } from "react";

import "./App.css";
import SearchField from "./components/SearchField";
import { getWeatherData } from "./api/weatherAPI";
import type { WeatherData } from "./types/weaterData";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import WeeklyForecastInfo from "./components/WeeklyForecastInfo";
import FavoritesCitiesModal from "./components/FavoritesCitiesModal";

function App() {
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("lviv");
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
        <div className="search-and-favorites">
          <SearchField city={city} setCity={setCity} isLoading={isLoading} />
          <button
            className="manage-favorites-button"
            onClick={() => setShowFavoritesModal(true)}
            aria-label="Open favorite cities"
            title="Open favorite cities"
          >
            ♥
          </button>
        </div>

        {isLoading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <>
            <CurrentWeatherInfo
              location={weatherData.location}
              current={weatherData.current}
              forecastDay={weatherData.forecast.forecastday[0]}
            />

            <WeeklyForecastInfo
              forecastDays={weatherData.forecast.forecastday}
            />
          </>
        )}
      </div>

      <FavoritesCitiesModal
        show={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        currentCity={city}
        selectCity={(selectedCity) => {
          setCity(selectedCity);
          setShowFavoritesModal(false);
        }}
      />
    </div>
  );
}

export default App;
