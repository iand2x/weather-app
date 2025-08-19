import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HistoryList from "@/components/HistoryList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type { WeatherData } from "@/services/weatherService";
import "./WeatherPage.css";

export interface SearchHistory {
  id: string;
  city: string;
  country?: string;
  timestamp: number;
}

export default function WeatherPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const handleSearch = async (city: string, country?: string) => {
    // TODO: Implement search logic with useWeather hook
    console.log("Search for:", { city, country });
  };

  const handleHistorySearch = (historyItem: SearchHistory) => {
    handleSearch(historyItem.city, historyItem.country);
  };

  const handleHistoryDelete = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="weather-page">
      <header className="weather-header">
        <h1 className="app-title">Weather App</h1>
        <ThemeSwitcher />
      </header>

      <main className="weather-main">
        <div className="weather-grid">
          <section className="search-section">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </section>

          <section className="weather-section">
            <WeatherCard data={weatherData} loading={loading} error={error} />
          </section>

          <section className="history-section">
            <HistoryList
              history={searchHistory}
              onSearch={handleHistorySearch}
              onDelete={handleHistoryDelete}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
