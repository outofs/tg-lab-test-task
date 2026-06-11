import React, { useContext } from "react";
import { FavoritesCitiesContext } from "../context/FavoritesCitiesContext";

type Props = {
  cityName: string;
};

const ManageFavoritesButton = ({ cityName }: Props) => {
  const { cities, changeCities } = useContext(FavoritesCitiesContext);
  const isFavorite = cities.includes(cityName);

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isFavorite) {
      changeCities([...cities, cityName]);
      return;
    }

    changeCities(cities.filter((city) => city !== cityName));
  };

  return (
    <button
      className={`manage-favorites-button ${isFavorite ? "active" : ""}`}
      onClick={handleAddToFavorites}
      aria-label={
        isFavorite
          ? `Видалити ${cityName} зі збереженого`
          : `Додати ${cityName} до збереженого`
      }
      title={isFavorite ? "Видалити зі збереженого" : "Додати до збереженого"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
};

export default ManageFavoritesButton;
