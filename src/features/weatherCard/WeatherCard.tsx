import type { WeatherData } from "@/types/weather";
import "./WeatherCard.css";

interface WeatherCardProps {
  data: WeatherData | null;
  loading?: boolean;
  error?: string | null;
  children?: React.ReactNode;
}

export default function WeatherCard({
  data,
  loading = false,
  error,
  children,
}: WeatherCardProps) {
  const formatTimestamp = (timestamp: number) => {
    // OpenWeather returns `dt` as a Unix timestamp in seconds.
    // JavaScript Date expects milliseconds, so multiply when value looks like seconds.
    const ts = timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp;
    const date = new Date(ts);
    return date.toLocaleString();
  };

  const renderWeatherContent = () => {
    if (loading) {
      return (
        <>
          <div
            className="skeleton"
            aria-live="polite"
            aria-label="Loading weather data"
          >
            <div className="skeleton-item skeleton-title"></div>
            <div className="skeleton-item skeleton-temp"></div>
            <div className="skeleton-item skeleton-desc"></div>
          </div>
          <p className="loading-text">Loading weather data...</p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <h3 className="error-title">Unable to fetch weather</h3>
          <p className="error-text" role="alert" aria-live="assertive">
            {error}
          </p>
        </>
      );
    }

    if (!data) {
      return (
        <>
          <h3 className="empty-title">Welcome to Weather App</h3>
          <p className="empty-text">
            Search for a city to see current weather conditions
          </p>
        </>
      );
    }

    return (
      <>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="weather-icon"
        />
        <div className="weather-card-content" aria-live="polite">
          <h2 className="weather-card-title">Today's Weather</h2>

          <div className="weather-main-content">
            <div className="weather-temperature-container">
              <div className="temperature-display">
                <span className="temperature">{data.temperature}°</span>
                <span className="feels-like">Feels like {data.feelsLike}°</span>
                <span className="location">
                  {data.city}, {data.country}
                </span>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">{data.condition}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity: {data.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{formatTimestamp(data.dt)}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`weather-card ${loading ? "loading" : ""} ${
        error ? "error" : ""
      } ${!data && !loading && !error ? "empty" : ""}`}
    >
      {renderWeatherContent()}
      {children && <div className="weather-card-children">{children}</div>}
    </div>
  );
}
