import type { City } from "../types/cities";
import type { HourlyForecast, WeatherData } from "../types/weaterData";

// normaly you should store this in .env file but for the sake of this test task, I will leave it here
const BASE_URL = "https://api.openweathermap.org";
const API_KEY = "bcae4dc921bc210fa917e63d41df1c31";
const CURRENT_URL = `${BASE_URL}/data/2.5/weather`;
const FORECAST_URL = `${BASE_URL}/data/2.5/forecast`;
const GEO_URL = `${BASE_URL}/geo/1.0/direct`;

export const getCitiesByName = async (
  cityName: string,
  signal?: AbortSignal,
): Promise<City[]> => {
  const response = await fetch(
    `${GEO_URL}?q=${encodeURIComponent(cityName)}&limit=10&appid=${API_KEY}`,
    { signal },
  );
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message
      ? errorData.message + ` (${errorData.cod})`
      : "Something went wrong";
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const response = await fetch(
    `${CURRENT_URL}?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${API_KEY}`,
  );
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message
      ? errorData.message + ` (${errorData.cod})`
      : "Something went wrong";
    throw new Error(message);
  }
  const data = await response.json();

  return data as WeatherData;
};

export const getHourlyWeather = async (
  lat: number,
  lon: number,
): Promise<HourlyForecast> => {
  const response = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${API_KEY}`,
  );
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message
      ? errorData.message + ` (${errorData.cod})`
      : "Something went wrong";
    throw new Error(message);
  }
  const data = await response.json();

  return data as HourlyForecast;
};
