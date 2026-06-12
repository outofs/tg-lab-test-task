import { useEffect, useState, type ChangeEvent } from "react";
import { getCitiesByName } from "../api";
import type { City } from "../types/cities";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type Props = {
  setCity: (city: City) => void;
};

const SearchField = ({ setCity }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), 1000);

  const canShowDropdown = debouncedSearchTerm.length >= 3 && isOpen;
  const normalizedSearchTerm = debouncedSearchTerm.toLowerCase();

  useEffect(() => {
    if (normalizedSearchTerm.length < 3) {
      return;
    }

    const controller = new AbortController();

    const loadCities = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await getCitiesByName(
          debouncedSearchTerm,
          controller.signal,
        );
        setCities(result);
        setIsOpen(true);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setCities([]);
        setError(message);
        setIsOpen(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCities();

    return () => controller.abort();
  }, [debouncedSearchTerm, normalizedSearchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setError("");
    setIsOpen(true);
  };

  const handleSelectCity = (city: City) => {
    setSearchTerm("");
    setCities([]);
    setError("");
    setIsOpen(false);
    setCity(city);
  };

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
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Kyiv, Lviv, Odesa"
          autoComplete="off"
        />
        {isLoading && (
          <div className="search-loader" aria-hidden="true">
            <div className="search-loader__spinner" />
          </div>
        )}
      </div>

      {!isLoading && error && canShowDropdown && (
        <small
          className="search-field__status search-field__status--error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </small>
      )}

      {!isLoading && canShowDropdown && cities.length > 0 && (
        <div
          role="listbox"
          aria-label="Cities"
          className="search-field__dropdown"
        >
          {cities.map((city) => {
            const label = [city.name, city.state, city.country]
              .filter(Boolean)
              .join(", ");

            return (
              <button
                key={`${city.name}-${city.lat}-${city.lon}`}
                type="button"
                role="option"
                className="search-field__result"
                onClick={() => handleSelectCity(city)}
              >
                <span className="search-field__result-name">{city.name}</span>
                <span className="search-field__result-meta">{label}</span>
              </button>
            );
          })}
        </div>
      )}

      {!isLoading && canShowDropdown && !error && cities.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="search-field__dropdown search-field__dropdown--empty"
        >
          <p className="search-field__empty-title">Міста не знайдено</p>
          <p className="search-field__empty-subtitle">
            Спробуйте інше написання або іншу назву міста.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchField;
