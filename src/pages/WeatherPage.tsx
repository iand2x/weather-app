import SearchBar from "src/features/searchBar/SearchBar";
import WeatherCard from "src/features/weatherCard/WeatherCard";
import HistoryList from "src/features/history/HistoryList";
import ThemeSwitcher from "src/features/themeSwitcher/ThemeSwitcher";
import { useLazyGetWeatherQuery } from "src/features/weatherCard/weatherApiSlice";
import { useAppSelector, useAppDispatch } from "src/app/hooks";
import {
  addSearchToHistory,
  removeSearchFromHistory,
  clearSearchHistory,
  setMaxHistoryLength,
} from "src/features/history/searchHistorySlice";
import { getErrorMessage } from "@/utils/isErrorMessage";
import type { SearchHistoryItem } from "@/types/history";
import "./WeatherPage.css";

export default function WeatherPage() {
  // Redux state and actions
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state) => state.searchHistory.items); //global state
  const maxHistoryLength = useAppSelector(
    (state) => state.searchHistory.maxLength
  );

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

  const handleHistorySearch = (historyItem: SearchHistoryItem) => {
    handleSearch(historyItem.city, historyItem.country);
  };

  const handleHistoryDelete = (id: string) => {
    dispatch(removeSearchFromHistory(id));
  };

  const handleHistoryClear = () => {
    dispatch(clearSearchHistory());
  };

  const handleSetMaxLength = (length: number) => {
    dispatch(setMaxHistoryLength(length));
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
                onClear={handleHistoryClear}
                maxLength={maxHistoryLength}
                onSetMaxLength={handleSetMaxLength}
                loading={isLoading || isFetching}
              />
            </WeatherCard>
          </section>
        </div>
      </main>
    </div>
  );
}
