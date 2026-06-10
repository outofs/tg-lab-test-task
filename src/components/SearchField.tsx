import React from "react";

type Props = {
  city: string;
  setCity: (city: string) => void;
  isLoading: boolean;
};

const SearchField = ({ city, setCity, isLoading }: Props) => {
  return (
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
      disabled={isLoading}
    />
  );
};

export default SearchField;
