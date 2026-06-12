import { useMemo, useState } from "react";
import type { DailyForecast } from "../types/weaterData";
import WeeklyForecastInfoCard from "./WeeklyForecastInfoCard";

type Props = {
  forecastDays: DailyForecast[];
};

const daysOptions = [
  { label: "3 дні", value: 3 },
  { label: "5 днів", value: 5 },
];

const WeeklyForecastInfo = ({ forecastDays }: Props) => {
  const [selectedDays, setSelectedDays] = useState<number>(5);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDays(parseInt(event.target.value));
  };

  const filteredForecastDays = useMemo(() => {
    return forecastDays.slice(0, selectedDays);
  }, [forecastDays, selectedDays]);

  return (
    <section className="card weekly-forecast-info">
      <div className="weekly-forecast-info__header">
        <p className="info-eyebrow">Прогноз на</p>
        <select
          className="weekly-forecast-info__select"
          value={selectedDays}
          onChange={handleSelectChange}
        >
          {daysOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="weekly-forecast-info__option"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-list">
        {filteredForecastDays.length > 0 ? (
          filteredForecastDays.map((forecastDay: DailyForecast) => (
            <WeeklyForecastInfoCard key={forecastDay.date} day={forecastDay} />
          ))
        ) : (
          <p className="no-data-message">Інформація про прогноз відсутня</p>
        )}
      </div>
    </section>
  );
};

export default WeeklyForecastInfo;
