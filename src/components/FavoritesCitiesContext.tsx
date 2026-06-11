import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritesCitiesContextType {
  cities: string[];
  changeCities: (cities: string[]) => void;
}

export const FavoritesCitiesContext = createContext<FavoritesCitiesContextType>(
  {
    cities: [],
    changeCities: () => {},
  },
);

type Props = {
  children: React.ReactNode;
};

export const FavoritesCitiesProvider = ({ children }: Props) => {
  const [cities, setCities] = useLocalStorage<string[]>("favorites", []);

  return (
    <FavoritesCitiesContext.Provider
      value={{
        cities,
        changeCities: (cities: string[]) => {
          setCities(cities);
        },
      }}
    >
      {children}
    </FavoritesCitiesContext.Provider>
  );
};
