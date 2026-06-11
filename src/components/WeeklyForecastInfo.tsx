import type { ForecastDay } from "../types/weaterData";
import WeeklyForecastInfoCard from "./WeeklyForecastInfoCard";

type Props = {
  forecastDays: ForecastDay[];
};

const WeeklyForecastInfo = ({ forecastDays }: Props) => {
  return (
    <section className="card weekly-forecast-info">
      <div className="weekly-forecast-info__header">
        <div>
          <p className="weekly-forecast-info__eyebrow">Weekly forecast</p>
        </div>
      </div>

      <div className="weekly-forecast-info__list">
        {forecastDays.map((forecastDay: ForecastDay) => (
          <WeeklyForecastInfoCard
            key={forecastDay.date_epoch}
            day={forecastDay}
          />
        ))}
      </div>
    </section>
  );
};

export default WeeklyForecastInfo;
