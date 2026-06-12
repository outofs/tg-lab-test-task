import { useEffect, useState } from "react";
import { getCurrentWeather, getHourlyWeather } from "../api";
import type {
  HourlyForecast,
  WeatherData,
  DailyForecast,
} from "../types/weaterData";
import CurrentWeatherInfo from "./CurrentWeatherInfo";
import WeeklyForecastInfo from "./WeeklyForecastInfo";
import WeatherLoader from "./WeatherLoader";
import ErrorMessage from "./ErrorMessage";
import type { City } from "../types/cities";
import { buildDailyForecast } from "../utils";

type Props = {
  city: City | null;
};

const MainContent = ({ city }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [weatherData, setWeatherData] = useState<{
    currentWeather: WeatherData | null;
    hourlyForecast: HourlyForecast | null;
    dailyForecast: DailyForecast[];
  }>({
    currentWeather: null,
    hourlyForecast: null,
    dailyForecast: [],
  });

  const [error, setError] = useState("");

  const loadWeatherData = async (city: City) => {
    setIsLoading(true);
    setError("");

    try {
      const [currentWeatherData, hourlyForecastData] = await Promise.all([
        getCurrentWeather(city.lat, city.lon),
        getHourlyWeather(city.lat, city.lon),
      ]);
      setWeatherData({
        currentWeather: currentWeatherData,
        hourlyForecast: hourlyForecastData,
        dailyForecast: buildDailyForecast(
          hourlyForecastData.list,
          hourlyForecastData.city.timezone,
        ),
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setWeatherData({
        currentWeather: null,
        hourlyForecast: null,
        dailyForecast: [],
      });
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      loadWeatherData(city);
    } else {
      setWeatherData({
        currentWeather: null,
        hourlyForecast: null,
        dailyForecast: [],
      });
    }
  }, [city]);

  return (
    <main>
      {isLoading && <WeatherLoader />}

      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && !weatherData.currentWeather && (
        <div className="no-data-message card" style={{ height: "300px" }}>
          <p>Виберіть місто, щоб побачити погоду</p>
        </div>
      )}

      {weatherData.currentWeather && !isLoading && !error && (
        <>
          <CurrentWeatherInfo
            city={city!}
            currentWeather={weatherData.currentWeather}
            hourlyForecast={weatherData.hourlyForecast}
          />

          <WeeklyForecastInfo forecastDays={weatherData.dailyForecast} />
        </>
      )}
    </main>
  );
};

export default MainContent;
