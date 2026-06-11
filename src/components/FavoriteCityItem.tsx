type Props = {
  city: string;
  isActive: boolean;
  selectCity: (city: string) => void;
  handleRemoveCity: (city: string) => void;
};

const FavoriteCityItem = ({
  city,
  isActive,
  selectCity,
  handleRemoveCity,
}: Props) => {
  return (
    <div
      key={city}
      className={`favorites-modal__item ${isActive ? "is-active" : ""}`}
    >
      <button
        className="favorites-modal__city"
        onClick={() => selectCity(city)}
      >
        <span>{city}</span>
        {isActive && <strong>Вибране</strong>}
      </button>

      <button
        className="favorites-modal__remove"
        onClick={() => handleRemoveCity(city)}
        aria-label={`Видалити ${city} з обраного`}
      >
        &times;
      </button>
    </div>
  );
};

export default FavoriteCityItem;
