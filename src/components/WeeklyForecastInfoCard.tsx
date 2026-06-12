import type { DailyForecast } from "../types/weaterData";
import { getWeatherIconUrl } from "../utils";

type Props = {
  day: DailyForecast;
};

const WeeklyForecastInfoCard = ({ day }: Props) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("uk-UA", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <article className="weekly-forecast-info__card">
      <p className="weekly-forecast-info__date">{formatDate(day.date)}</p>
      <img src={getWeatherIconUrl(day.icon)} alt={day.description} />
      <p className="weekly-forecast-info__temp">{day.avgTemp}°</p>
      <p className="weekly-forecast-info__condition">{day.description}</p>
    </article>
  );
};

export default WeeklyForecastInfoCard;
