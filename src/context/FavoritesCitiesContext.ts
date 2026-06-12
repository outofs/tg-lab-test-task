import { createContext } from "react";
import type { City } from "../types/cities";

export interface FavoritesCitiesContextType {
  cities: City[];
  changeCities: (cities: City[]) => void;
}

export const FavoritesCitiesContext = createContext<FavoritesCitiesContextType>(
  {
    cities: [],
    changeCities: () => {},
  },
);
