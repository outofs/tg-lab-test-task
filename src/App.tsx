import { useEffect, useState } from "react";

import "./App.css";
import SearchField from "./components/SearchField";
import { getWeatherData } from "./api/weatherAPI";
import type { WeatherData } from "./types/weaterData";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import WeeklyForecastInfo from "./components/WeeklyForecastInfo";
import FavoritesCitiesModal from "./components/FavoritesCitiesModal";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import WeatherLoader from "./components/WeatherLoader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("Kyiv");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const debouncedCity = useDebouncedValue(city.trim(), 1000);

  const handleCityChange = (nextCity: string) => {
    setCity(nextCity);
    setError("");

    if (!nextCity.trim()) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedCity) {
      return;
    }

    const controller = new AbortController();

    const loadWeatherData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getWeatherData(debouncedCity, controller.signal);
        setWeatherData(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setWeatherData(null);
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadWeatherData();

    return () => controller.abort();
  }, [debouncedCity]);

  return (
    <div className="app">
      <div className="container">
        <div className="search-and-favorites">
          <SearchField
            city={city}
            setCity={handleCityChange}
            isLoading={isLoading}
          />
          <button
            className="manage-favorites-button"
            onClick={() => setShowFavoritesModal(true)}
            aria-label="Відкрити збережені міста"
            title="Відкрити збережені міста"
          >
            ♥
          </button>
        </div>

        {isLoading && <WeatherLoader />}

        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && !weatherData && (
          <p style={{ color: "gray" }}>Немає доступних даних про погоду</p>
        )}

        {weatherData && !isLoading && !error && (
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
