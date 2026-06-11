import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FavoritesCitiesContext } from "../context/FavoritesCitiesContext";

type Props = {
  children: ReactNode;
};

export const FavoritesCitiesProvider = ({ children }: Props) => {
  const [cities, setCities] = useLocalStorage<string[]>("favorites", []);

  return (
    <FavoritesCitiesContext.Provider
      value={{
        cities,
        changeCities: (nextCities: string[]) => {
          setCities(nextCities);
        },
      }}
    >
      {children}
    </FavoritesCitiesContext.Provider>
  );
};
