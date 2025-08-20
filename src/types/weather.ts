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
  dt: number;
}

export interface WeatherQuery {
  city: string;
  country?: string;
}

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
