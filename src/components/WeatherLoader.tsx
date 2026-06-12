const WeatherLoader = () => {
  return (
    <div className="weather-loader card" aria-live="polite" aria-busy="true">
      <span className="weather-loader__spinner" aria-hidden="true" />
      <p className="weather-loader__text">Завантаження...</p>
    </div>
  );
};

export default WeatherLoader;
