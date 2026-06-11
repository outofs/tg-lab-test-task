import { useContext, useEffect } from "react";
import { FavoritesCitiesContext } from "../context/FavoritesCitiesContext";
import FavoriteCityItem from "./FavoriteCityItem";

type Props = {
  show: boolean;
  onClose: () => void;
  selectCity: (city: string) => void;
  currentCity?: string;
};

const FavoritesCitiesModal = ({
  show,
  onClose,
  selectCity,
  currentCity,
}: Props) => {
  const { cities, changeCities } = useContext(FavoritesCitiesContext);

  useEffect(() => {
    if (!show) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [show, onClose]);

  const handleRemoveCity = (cityToRemove: string) => {
    changeCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div
      className={`favorites-modal__overlay ${show ? "is-open" : ""}`}
      role="presentation"
      onClick={onClose}
    >
      <div
        className="favorites-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="favorites-modal__header">
          <div>
            <p className="favorites-modal__eyebrow">Збережені міста</p>
          </div>
          <button className="favorites-modal__close" onClick={onClose}>
            Закрити
          </button>
        </div>

        {cities.length === 0 ? (
          <div className="favorites-modal__empty">
            <p>Ще немає збережених міст.</p>
            <span>
              Додайте місто за допомогою кнопки серця на картці погоди.
            </span>
          </div>
        ) : (
          <div className="favorites-modal__list">
            {cities.map((city) => {
              const isActive =
                city.toLowerCase() === currentCity?.toLowerCase();

              return (
                <FavoriteCityItem
                  key={city}
                  city={city}
                  isActive={isActive}
                  selectCity={selectCity}
                  handleRemoveCity={handleRemoveCity}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesCitiesModal;
