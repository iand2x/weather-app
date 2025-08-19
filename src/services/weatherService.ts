import axios from "axios";
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE } from "@/utils/config";

// OpenWeather API response shape
interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg?: number;
  };
  visibility?: number;
}

// Internal weather model (clean interface)
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection?: number;
  visibility?: number;
}

export interface WeatherQuery {
  city: string;
  country?: string;
}

export class WeatherServiceError extends Error {
  public code: "NETWORK_ERROR" | "NOT_FOUND" | "INVALID_KEY" | "UNKNOWN";

  constructor(
    message: string,
    code: "NETWORK_ERROR" | "NOT_FOUND" | "INVALID_KEY" | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "WeatherServiceError";
    this.code = code;
  }
}

export async function getWeather({
  city,
  country,
}: WeatherQuery): Promise<WeatherData> {
  if (!OPENWEATHER_API_KEY) {
    throw new WeatherServiceError("API key not configured", "INVALID_KEY");
  }

  if (!city?.trim()) {
    throw new WeatherServiceError("City name is required", "UNKNOWN");
  }

  const query = country ? `${city.trim()},${country.trim()}` : city.trim();
  const url = `${OPENWEATHER_BASE}/weather`;

  try {
    const response = await axios.get<OpenWeatherResponse>(url, {
      params: {
        q: query,
        appid: OPENWEATHER_API_KEY,
        units: "metric", // Celsius
      },
      timeout: 10000, // 10 second timeout
    });

    const data = response.data;

    // Map API response to internal model
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0]?.main || "Unknown",
      description: data.weather[0]?.description || "No description",
      icon: data.weather[0]?.icon || "01d",
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new WeatherServiceError(
          `City "${city}" not found. Please check the spelling and try again.`,
          "NOT_FOUND"
        );
      }
      if (error.response?.status === 401) {
        throw new WeatherServiceError("Invalid API key", "INVALID_KEY");
      }
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        throw new WeatherServiceError(
          "Request timed out. Please try again.",
          "NETWORK_ERROR"
        );
      }
      throw new WeatherServiceError(
        "Failed to fetch weather data. Please check your internet connection.",
        "NETWORK_ERROR"
      );
    }

    throw new WeatherServiceError("An unexpected error occurred", "UNKNOWN");
  }
}
