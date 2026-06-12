# Weather App

A small weather dashboard built with React and TypeScript. It lets you search for cities, view current weather, see hourly and weekly forecasts, and manage a list of favorite cities.

## API

The app uses the [OpenWeatherMap API](https://openweathermap.org/api):

- Geocoding API for city search suggestions
- Current Weather Data API for weather details

The API key is currently stored in the source code for simplicity in this test task.

## Technologies

- React
- TypeScript
- Vite
- CSS
- OpenWeatherMap API

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at the local URL shown in the terminal. (in my case was [http](http://localhost:5173/))

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally
