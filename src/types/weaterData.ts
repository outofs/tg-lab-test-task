export interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  wind: {
    speed: number;
    deg: number;
  };

  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
}

export interface HourlyListItem extends WeatherData {
  dt: number;
}

export interface HourlyForecast {
  cod: string;
  message: number;
  cnt: number;
  list: HourlyListItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  icon: string;
  weatherId: number;
  description: string;
}
