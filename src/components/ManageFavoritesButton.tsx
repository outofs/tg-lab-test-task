import React, { useContext } from "react";
import { FavoritesCitiesContext } from "../context/FavoritesCitiesContext";
import type { City } from "../types/cities";

type Props = {
  city: City;
};

const ManageFavoritesButton = ({ city }: Props) => {
  const { cities, changeCities } = useContext(FavoritesCitiesContext);
  const isFavorite = cities.some(
    (c) => c.lat === city.lat && c.lon === city.lon,
  );

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isFavorite) {
      changeCities([...cities, city]);
      return;
    }

    changeCities(
      cities.filter((c) => c.lat !== city.lat || c.lon !== city.lon),
    );
  };

  return (
    <button
      className={`manage-favorites-button ${isFavorite ? "active" : ""}`}
      onClick={handleAddToFavorites}
      aria-label={
        isFavorite
          ? `Видалити ${city.name} зі збереженого`
          : `Додати ${city.name} до збереженого`
      }
      title={isFavorite ? "Видалити зі збереженого" : "Додати до збереженого"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
};

export default ManageFavoritesButton;
