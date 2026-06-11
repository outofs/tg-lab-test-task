import type { ForecastDay } from "../types/weaterData";

type Props = {
  day: ForecastDay;
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
      <img src={day.day.condition.icon} alt={day.day.condition.text} />
      <p className="weekly-forecast-info__temp">{day.day.avgtemp_c}°</p>
      <p className="weekly-forecast-info__condition">
        {day.day.condition.text}
      </p>
    </article>
  );
};

export default WeeklyForecastInfoCard;
