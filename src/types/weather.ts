export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  dt: number;
}

export interface WeatherQuery {
  city: string;
  country?: string;
}

/**
 * Weather data returned from OpenWeather API
 * @see https://openweathermap.org/current#current_JSON
 */
export interface OpenWeatherResponse {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  visibility?: number;
  name: string;
  sys: {
    country: string;
  };
  dt: number;
}
