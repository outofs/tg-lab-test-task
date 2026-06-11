import React, { useContext } from "react";
import { FavoritesCitiesContext } from "./FavoritesCitiesContext";

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
          ? `Remove ${cityName} from favorites`
          : `Add ${cityName} to favorites`
      }
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
};

export default ManageFavoritesButton;
