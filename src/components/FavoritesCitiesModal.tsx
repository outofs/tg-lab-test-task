import { useContext, useEffect, useState } from "react";
import { FavoritesCitiesContext } from "./FavoritesCitiesContext";

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
  const [isMounted, setIsMounted] = useState(show);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    setIsVisible(false);
    const timeoutId = window.setTimeout(() => setIsMounted(false), 220);

    return () => window.clearTimeout(timeoutId);
  }, [show]);

  useEffect(() => {
    if (!isMounted) {
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
  }, [isMounted, onClose]);

  if (!isMounted) {
    return null;
  }

  const handleRemoveCity = (cityToRemove: string) => {
    changeCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div
      className={`favorites-modal__overlay ${isVisible ? "is-open" : ""}`}
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
            <p className="favorites-modal__eyebrow">Saved cities</p>
          </div>
          <button className="favorites-modal__close" onClick={onClose}>
            Close
          </button>
        </div>

        {cities.length === 0 ? (
          <div className="favorites-modal__empty">
            <p>No saved cities yet.</p>
            <span>Add a city with the heart button on the weather card.</span>
          </div>
        ) : (
          <div className="favorites-modal__list">
            {cities.map((city) => {
              const isActive =
                city.toLowerCase() === currentCity?.toLowerCase();

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
                    {isActive && <strong>Current</strong>}
                  </button>

                  <button
                    className="favorites-modal__remove"
                    onClick={() => handleRemoveCity(city)}
                    aria-label={`Remove ${city} from favorites`}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesCitiesModal;
