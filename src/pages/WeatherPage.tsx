import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HistoryList from "@/components/HistoryList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useLazyGetWeatherQuery } from "src/store/weatherApiSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addSearchToHistory,
  removeSearchFromHistory,
} from "@/store/searchHistorySlice";
import { getErrorMessage } from "@/utils/isErrorMessage";
import type { SearchHistoryItem } from "@/types/history";
import "./WeatherPage.css";

// Re-export for compatibility with existing HistoryList component
export type SearchHistory = SearchHistoryItem;

export default function WeatherPage() {
  // Redux state and actions
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state) => state.searchHistory.items); //global state

  // RTK Query hook for weather data
  // side note: isFetching and isLoading are RTK Query hooks
  const [getWeather, { data: weatherData, isLoading, isFetching, error }] =
    useLazyGetWeatherQuery();

  const handleSearch = async (city: string, country?: string) => {
    if (!city.trim()) return;

    const trimmedCity = city.trim();
    const trimmedCountry = country?.trim();

    try {
      const result = await getWeather({
        city: trimmedCity,
        country: trimmedCountry,
      }).unwrap();

      // Add to history on successful search using response data
      dispatch(
        addSearchToHistory({
          city: result.city,
          country: result.country,
        })
      );
    } catch (err) {
      // Error is handled by RTK Query automatically
      console.error("Search failed:", err);
    }
  };

  const handleHistorySearch = (historyItem: SearchHistory) => {
    handleSearch(historyItem.city, historyItem.country);
  };

  const handleHistoryDelete = (id: string) => {
    dispatch(removeSearchFromHistory(id));
  };

  // Transform RTK Query error to string for WeatherCard component
  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <div className="weather-page">
      <header className="weather-header">
        <ThemeSwitcher />
      </header>

      <main className="weather-main">
        <div className="weather-grid">
          <section className="search-section">
            <SearchBar
              onSearch={handleSearch}
              loading={isLoading || isFetching}
            />
          </section>

          <section className="weather-section">
            <WeatherCard
              data={weatherData || null}
              loading={isLoading || isFetching}
              error={errorMessage}
            >
              <HistoryList
                history={searchHistory}
                onSearch={handleHistorySearch}
                onDelete={handleHistoryDelete}
                loading={isLoading || isFetching}
              />
            </WeatherCard>
          </section>
        </div>
      </main>
    </div>
  );
}
