type Props = {
  city: string;
  setCity: (city: string) => void;
  isLoading: boolean;
};

const SearchField = ({ city, setCity, isLoading }: Props) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <img
          className="search-icon"
          src="./search-svgrepo-com.svg"
          alt="Search Icon"
        />
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default SearchField;
