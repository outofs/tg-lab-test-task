import type {
  CurrentWeather,
  ForecastDay,
  ForecastHour,
} from "../types/weaterData";
import HourlyWeatherInfoCard from "./HourlyWeatherInfoCard";

type Props = {
  forecastDay: ForecastDay;
  current: CurrentWeather;
};

const HourlyWeatherInfo = ({ forecastDay, current }: Props) => {
  const upcomingHours = forecastDay.hour
    .filter((hour) => hour.time_epoch >= current.last_updated_epoch)
    .slice(0, 12);

  const hoursToRender =
    upcomingHours.length > 0 ? upcomingHours : forecastDay.hour.slice(0, 12);

  return (
    <section className="card hourly-weather-info">
      <div className="hourly-weather-info__header">
        <div>
          <p className="hourly-weather-info__eyebrow">Hourly forecast</p>
          <h3>Next 12 hours</h3>
        </div>
        <p className="hourly-weather-info__meta">
          Updated at{" "}
          {new Date(current.last_updated).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="hourly-weather-info__list">
        {hoursToRender.map((hourlyWeather: ForecastHour) => (
          <HourlyWeatherInfoCard
            key={hourlyWeather.time_epoch}
            hourlyWeather={hourlyWeather}
          />
        ))}
      </div>
    </section>
  );
};

export default HourlyWeatherInfo;
