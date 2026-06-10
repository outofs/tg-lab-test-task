import type { WeatherData } from "../types/weaterData";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "4f4b54cb0ac1486c9fb145304261006"; // normaly you should store this in .env file but for the sake of this test task, I will leave it here

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}current.json?q=${city}&key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();

  return data as WeatherData;
};
