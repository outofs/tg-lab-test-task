import type { ForecastHour } from "../types/weaterData";

type Props = {
  hourlyWeather: ForecastHour;
};

const HourlyWeatherInfoCard = ({ hourlyWeather }: Props) => {
  const formatHour = (timeEpoch: number) => {
    const date = new Date(timeEpoch * 1000);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <article
      className="hourly-weather-info__card"
      key={hourlyWeather.time_epoch}
    >
      <p className="hourly-weather-info__time">
        {formatHour(hourlyWeather.time_epoch)}
      </p>
      <img
        src={hourlyWeather.condition.icon}
        alt={hourlyWeather.condition.text}
      />
      <p className="hourly-weather-info__temp">{hourlyWeather.temp_c}°</p>
      <p className="hourly-weather-info__condition">
        {hourlyWeather.condition.text}
      </p>
    </article>
  );
};

export default HourlyWeatherInfoCard;
