import { useMemo, useState } from "react";
import type { ForecastDay } from "../types/weaterData";
import WeeklyForecastInfoCard from "./WeeklyForecastInfoCard";

type Props = {
  forecastDays: ForecastDay[];
};

const daysOptions = [
  { label: "3 days", value: 3 },
  { label: "5 days", value: 5 },
  { label: "7 days", value: 7 },
];

const WeeklyForecastInfo = ({ forecastDays }: Props) => {
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDays(parseInt(event.target.value));
  };

  const filteredForecastDays = useMemo(() => {
    return forecastDays.slice(0, selectedDays);
  }, [forecastDays, selectedDays]);

  return (
    <section className="card weekly-forecast-info">
      <div className="weekly-forecast-info__header">
        <p className="weekly-forecast-info__eyebrow">Weekly forecast</p>
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

      <div className="weekly-forecast-info__list">
        {filteredForecastDays.map((forecastDay: ForecastDay) => (
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
