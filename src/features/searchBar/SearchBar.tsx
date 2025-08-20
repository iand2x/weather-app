import { useState } from "react";
import type { FormEvent } from "react";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (city: string, country?: string) => void;
  loading?: boolean;
}

export default function SearchBar({
  onSearch,
  loading = false,
}: SearchBarProps) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    onSearch(city.trim(), country.trim() || undefined);
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <div className="search-input-container">
          <label htmlFor="country-input" className="country-label">
            Country Code
          </label>
          <div className="search-input-wrapper">
            <input
              id="country-input"
              type="text"
              value={country}
              placeholder="Optional"
              onChange={(e) => setCountry(e.target.value)}
              disabled={loading}
              className="search-input country-input"
            />
            <div className="input-divider" />
            <input
              id="city-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              disabled={loading}
              required
              className="search-input"
            />
            {city.trim() && (
              <button
                type="button"
                onClick={handleClear}
                className="clear-button"
                disabled={loading}
                role="button"
                aria-label="Clear inputs"
              >
                <HiOutlineX />
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="search-button"
          role="button"
          aria-label="Search for weather"
        >
          <HiOutlineSearch size={18} />
        </button>
      </div>
    </form>
  );
}
