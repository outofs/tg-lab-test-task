import type { HourlyListItem, HourlyForecast } from "../types/weaterData";
import HourlyWeatherInfoCard from "./HourlyWeatherInfoCard";

type Props = {
  hourlyForecast: HourlyForecast;
};

const HourlyWeatherInfo = ({ hourlyForecast }: Props) => {
  const upcomingHours = hourlyForecast.list
    .filter((hour) => hour.dt >= Date.now() / 1000)
    .slice(0, 8);

  const hoursToRender =
    upcomingHours.length > 0 ? upcomingHours : hourlyForecast.list.slice(0, 8);

  return (
    <section className="hourly-weather-info">
      <div className="hourly-weather-info__header">
        <div>
          <p className="info-eyebrow">Погодинний прогноз</p>
          <small>3-годинний інтервал обмеження API</small>
        </div>
      </div>

      <div className="cards-list">
        {hoursToRender.length > 0 ? (
          hoursToRender.map((hourlyWeather: HourlyListItem) => (
            <HourlyWeatherInfoCard
              key={hourlyWeather.dt}
              hourlyWeather={hourlyWeather}
            />
          ))
        ) : (
          <p className="no-data-message">
            Інформація про погодинний прогноз відсутня
          </p>
        )}
      </div>
    </section>
  );
};

export default HourlyWeatherInfo;
