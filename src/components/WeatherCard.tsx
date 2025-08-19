import type { WeatherData } from "@/services/weatherService";
import "./WeatherCard.css";

interface WeatherCardProps {
  data: WeatherData | null;
  loading?: boolean;
  error?: string | null;
}

export default function WeatherCard({
  data,
  loading = false,
  error,
}: WeatherCardProps) {
  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="skeleton">
          <div className="skeleton-item skeleton-title"></div>
          <div className="skeleton-item skeleton-temp"></div>
          <div className="skeleton-item skeleton-desc"></div>
        </div>
        <p className="loading-text">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card error">
        <h3 className="error-title">Unable to fetch weather</h3>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="weather-card empty">
        <h3 className="empty-title">Welcome to Weather App</h3>
        <p className="empty-text">
          Search for a city to see current weather conditions
        </p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div>
        <h2 className="weather-card-title">
          {data.city}, {data.country}
        </h2>

        <div className="weather-main">
          <div className="temperature-display">
            <span className="temperature">{data.temperature}°</span>
            <span className="feels-like">Feels like {data.feelsLike}°</span>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.description}
              className="weather-icon"
            />
          </div>
        </div>

        <div className="weather-description">
          <span className="condition">{data.condition}</span>
          <span className="description">{data.description}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{data.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{data.windSpeed} m/s</span>
        </div>
        {data.visibility && (
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">
              {(data.visibility / 1000).toFixed(1)} km
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
