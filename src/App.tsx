import { useState } from "react";

import "./App.css";
import type { City } from "./types/cities";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

import FavoritesCitiesModal from "./components/FavoritesCitiesModal";

function App() {
  const [city, setCity] = useState<City | null>(null);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  return (
    <div className="app">
      <div className="container">
        <Header
          setCity={setCity}
          handleShowFavoritesModal={() => setShowFavoritesModal(true)}
        />

        <MainContent city={city} />
      </div>

      <FavoritesCitiesModal
        show={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        currentCity={city}
        selectCity={(selectedCity) => {
          setCity(selectedCity);
          setShowFavoritesModal(false);
        }}
      />
    </div>
  );
}

export default App;
