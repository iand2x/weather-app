import { useState } from "react";
import type { FormEvent } from "react";
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

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-inputs">
        <div className="input-group">
          <label htmlFor="city-input" className="input-label">
            City
          </label>
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
        </div>

        <div className="input-group">
          <label htmlFor="country-input" className="input-label">
            Country (optional)
          </label>
          <input
            id="country-input"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., US, UK, FR"
            disabled={loading}
            className="search-input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="search-button"
      >
        {loading ? "Searching..." : "Get Weather"}
      </button>
    </form>
  );
}
