import SearchField from "./SearchField";
import type { City } from "../types/cities";

type Props = {
  setCity: (city: City) => void;
  handleShowFavoritesModal: () => void;
};

const Header = ({ setCity, handleShowFavoritesModal }: Props) => {
  return (
    <header className="search-and-favorites">
      <SearchField setCity={setCity} />
      <button
        className="manage-favorites-button"
        onClick={handleShowFavoritesModal}
        aria-label="Відкрити збережені міста"
        title="Відкрити збережені міста"
      >
        ♥
      </button>
    </header>
  );
};

export default Header;
