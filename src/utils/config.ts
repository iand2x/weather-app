export const OPENWEATHER_API_KEY = import.meta.env
  .VITE_OPENWEATHER_API_KEY as string;
export const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5"; //3.0 requires another api key to get the lat and lon for different locations
