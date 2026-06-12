import type { DailyForecast, HourlyListItem } from "../types/weaterData";

export const getWeatherIconUrl = (iconCode: string) =>
  `https://openweathermap.org/img/wn/${iconCode}.png`;

export const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;

export const formatWindSpeed = (speed: number) => `${Math.round(speed)} м/с`;

export const formatHour = (timeEpoch: number) => {
  const date = new Date(timeEpoch * 1000);

  return new Intl.DateTimeFormat("uk-UA", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

function getLocalHour(
  timestamp: number,
  timezoneOffsetSeconds: number,
): number {
  const localDate = new Date((timestamp + timezoneOffsetSeconds) * 1000);

  return localDate.getUTCHours();
}

export function buildDailyForecast(
  forecasts: HourlyListItem[],
  timezoneOffsetSeconds: number,
): DailyForecast[] {
  const grouped = new Map<string, HourlyListItem[]>();

  for (const forecast of forecasts) {
    const localDate = new Date((forecast.dt + timezoneOffsetSeconds) * 1000)
      .toISOString()
      .slice(0, 10);

    if (!grouped.has(localDate)) {
      grouped.set(localDate, []);
    }

    grouped.get(localDate)!.push(forecast);
  }

  return [...grouped.entries()].map(([date, items]) => {
    const temps = items.map((item) => item.main.temp);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

    // the midday forecast is chosen as the one closest to 12:00 local time, to represent the day's weather conditions
    const middayForecast = items.reduce((closest, current) => {
      const currentHour = getLocalHour(current.dt, timezoneOffsetSeconds);

      const closestHour = getLocalHour(closest.dt, timezoneOffsetSeconds);

      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12)
        ? current
        : closest;
    });

    return {
      date,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      avgTemp: Math.round(avgTemp),
      icon: middayForecast.weather[0].icon,
      weatherId: middayForecast.weather[0].id,
      description: middayForecast.weather[0].description,
    };
  });
}
