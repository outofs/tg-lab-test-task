import { createContext } from "react";

export interface FavoritesCitiesContextType {
  cities: string[];
  changeCities: (cities: string[]) => void;
}

export const FavoritesCitiesContext =
  createContext<FavoritesCitiesContextType>({
    cities: [],
    changeCities: () => {},
  });
