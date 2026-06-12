import type { City } from "../types/cities";

type Props = {
  city: City;
  isActive: boolean;
  selectCity: (city: City) => void;
  handleRemoveCity: (city: City) => void;
};

const FavoriteCityItem = ({
  city,
  isActive,
  selectCity,
  handleRemoveCity,
}: Props) => {
  return (
    <div className={`favorites-modal__item ${isActive ? "is-active" : ""}`}>
      <button
        className="favorites-modal__city"
        onClick={() => selectCity(city)}
      >
        <span>{`${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`}</span>
      </button>

      <button
        className="favorites-modal__remove"
        onClick={() => handleRemoveCity(city)}
        aria-label={`Видалити ${city.name} з обраного`}
      >
        &times;
      </button>
    </div>
  );
};

export default FavoriteCityItem;
