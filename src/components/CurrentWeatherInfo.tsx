import type { WeatherData, HourlyForecast } from "../types/weaterData";
import ManageFavoritesButton from "./ManageFavoritesButton";
import HourlyWeatherInfo from "./HourlyWeatherInfo";
import type { City } from "../types/cities";
import {
  formatTemperature,
  formatWindSpeed,
  getWeatherIconUrl,
} from "../utils";

type Props = {
  city: City;
  currentWeather: WeatherData;
  hourlyForecast: HourlyForecast | null;
};

const CurrentWeatherInfo = ({
  city,
  currentWeather,
  hourlyForecast,
}: Props) => {
  return (
    <div className="card">
      <div className="current-weather-info__header">
        <span className="info-eyebrow">Поточна погода</span>
      </div>

      <section className="current-weather-info">
        <div className="current-weather-info__heading">
          <h2>
            {city.name}
            <ManageFavoritesButton city={city} />
          </h2>
          <p className="current-weather-info__subtitle">
            {`${city?.state ? city.state + ", " : ""}${city.country}`}
          </p>
        </div>
        <div className="current-weather-info__hero">
          <div className="current-weather-info__temperature">
            <div className="current-weather-info__condition">
              <img
                src={getWeatherIconUrl(currentWeather.weather[0].icon)}
                alt={currentWeather.weather[0].main}
                width={72}
                height={72}
              />
              <span>{currentWeather.weather[0].description}</span>
            </div>

            <div className="current-weather-info__temperature-values">
              <h1 className="temperature">
                {formatTemperature(currentWeather.main.temp)}
              </h1>
              <div>
                <p>
                  Відчувається як{" "}
                  {formatTemperature(currentWeather.main.feels_like)}
                </p>
                <p>Макс {formatTemperature(currentWeather.main.temp_max)}</p>
                <p>Мін {formatTemperature(currentWeather.main.temp_min)}</p>
              </div>
            </div>
          </div>

          <div className="current-weather-info__details">
            <div className="detail-item">
              <span className="detail-item__label">Вологість</span>
              <span className="detail-item__value">
                {currentWeather.main.humidity}%
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Вітер</span>
              <span className="detail-item__value">
                {formatWindSpeed(currentWeather.wind.speed)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Опади</span>
              <span className="detail-item__value">
                {currentWeather.rain?.["1h"] ?? 0} мм/год
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Тиск</span>
              <span className="detail-item__value">
                {currentWeather.main.pressure} мм рт. ст.
              </span>
            </div>
          </div>
        </div>

        {hourlyForecast && (
          <HourlyWeatherInfo hourlyForecast={hourlyForecast} />
        )}
      </section>
    </div>
  );
};

export default CurrentWeatherInfo;
