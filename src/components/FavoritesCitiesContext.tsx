import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FavoritesCitiesContext } from "../context/FavoritesCitiesContext";
import type { City } from "../types/cities";

type Props = {
  children: ReactNode;
};

export const FavoritesCitiesProvider = ({ children }: Props) => {
  const [cities, setCities] = useLocalStorage<City[]>("favorites", []);

  return (
    <FavoritesCitiesContext.Provider
      value={{
        cities,
        changeCities: (nextCities: City[]) => {
          setCities(nextCities);
        },
      }}
    >
      {children}
    </FavoritesCitiesContext.Provider>
  );
};
