import type { HourlyListItem } from "../types/weaterData";
import { formatHour, formatTemperature, getWeatherIconUrl } from "../utils";

type Props = {
  hourlyWeather: HourlyListItem;
};

const HourlyWeatherInfoCard = ({ hourlyWeather }: Props) => {
  return (
    <article className="hourly-weather-info__card">
      <p className="hourly-weather-info__time">
        {formatHour(hourlyWeather.dt)}
      </p>
      <img
        src={getWeatherIconUrl(hourlyWeather.weather[0].icon)}
        alt={hourlyWeather.weather[0].description}
      />
      <p className="hourly-weather-info__temp">
        {formatTemperature(hourlyWeather.main.temp)}
      </p>
      <p className="hourly-weather-info__condition">
        {hourlyWeather.weather[0].description}
      </p>
    </article>
  );
};

export default HourlyWeatherInfoCard;
