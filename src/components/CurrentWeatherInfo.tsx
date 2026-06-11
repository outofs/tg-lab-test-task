import type {
  CurrentWeather,
  ForecastDay,
  Location,
} from "../types/weaterData";
import ManageFavoritesButton from "./ManageFavoritesButton";
import HourlyWeatherInfo from "./HourlyWeatherInfo";

type Props = {
  location: Location;
  current: CurrentWeather;
  forecastDay: ForecastDay;
};

const CurrentWeatherInfo = ({ location, current, forecastDay }: Props) => {
  return (
    <div className="card">
      <div className="current-weather-info__header">
        <span className="current-weather-info__eyebrow">Поточна погода</span>
        <span className="current-weather-info__meta">
          Оновлено о{" "}
          {new Date(current.last_updated).toLocaleTimeString("uk-UA", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>

      <section className="current-weather-info">
        <div className="current-weather-info__heading">
          <h2>
            {location.name}
            <ManageFavoritesButton cityName={location.name} />
          </h2>
          <p className="current-weather-info__subtitle">
            {location.region}, {location.country}
          </p>
        </div>
        <div className="current-weather-info__hero">
          <div className="current-weather-info__temperature">
            <div className="current-weather-info__condition">
              <img
                src={current.condition.icon}
                alt={current.condition.text}
                width={72}
                height={72}
              />
              <span>{current.condition.text}</span>
            </div>

            <div className="current-weather-info__temperature-values">
              <h1 className="temperature">{forecastDay.day.avgtemp_c}°C</h1>
              <div>
                <p>Відчувається як {current.feelslike_c}°C</p>
                <p>Макс {forecastDay.day.maxtemp_c}°C</p>
                <p>Мін {forecastDay.day.mintemp_c}°C</p>
              </div>
            </div>
          </div>

          <div className="current-weather-info__details">
            <div className="detail-item">
              <span className="detail-item__label">Вологість</span>
              <span className="detail-item__value">{current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Вітер</span>
              <span className="detail-item__value">
                {current.wind_kph} км/год
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Опади</span>
              <span className="detail-item__value">{current.precip_mm} mm</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Індекс UV</span>
              <span className="detail-item__value">{current.uv}</span>
            </div>
          </div>
        </div>

        <HourlyWeatherInfo forecastDay={forecastDay} current={current} />
      </section>
    </div>
  );
};

export default CurrentWeatherInfo;
