import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE } from "@/utils/config";
import type {
  WeatherData,
  WeatherQuery,
  OpenWeatherResponse,
} from "@/types/weather";

// Transform OpenWeather API response to our internal WeatherData format
function transformWeatherResponse(response: OpenWeatherResponse): WeatherData {
  const weather = response.weather[0];
  return {
    temperature: Math.round(response.main.temp),
    feelsLike: Math.round(response.main.feels_like),
    condition: weather.main,
    description: weather.description,
    icon: weather.icon,
    humidity: response.main.humidity,
    city: response.name,
    country: response.sys.country,
    dt: response.dt,
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rawBaseQuery = fetchBaseQuery({ baseUrl: OPENWEATHER_BASE });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const baseQueryWithDelay: BaseQueryFn = async (args, api, extra) => {
  if (import.meta.env.DEV) await sleep(800); // tweak ms to simulate loading.
  return rawBaseQuery(args, api, extra);
};

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: rawBaseQuery,
  //baseQuery: baseQueryWithDelay, // Simulated loading for development
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, WeatherQuery>({
      query: ({ city, country }) => ({
        url: "/weather",
        params: {
          q: country ? `${city},${country}` : city,
          appid: OPENWEATHER_API_KEY,
          units: "metric",
        },
        timeout: 10000,
      }),
      transformResponse: (response: OpenWeatherResponse) =>
        transformWeatherResponse(response),
      transformErrorResponse: (response: {
        status: string | number;
        data?: unknown;
      }) => {
        // Handle different error cases
        if (response.status === 404) {
          return {
            message: "City not found. Please check the spelling and try again.",
            code: "NOT_FOUND",
          };
        }
        if (response.status === 401) {
          return {
            message: "API configuration error. Please try again later.",
            code: "INVALID_KEY",
          };
        }
        if (
          response.status === "FETCH_ERROR" ||
          response.status === "TIMEOUT_ERROR"
        ) {
          return {
            message:
              "Network error. Please check your connection and try again.",
            code: "NETWORK_ERROR",
          };
        }
        return {
          message: "Unable to fetch weather data. Please try again.",
          code: "UNKNOWN",
        };
      },
      providesTags: (_result, _error, { city, country }) => [
        { type: "Weather", id: `${city}-${country || ""}` },
      ],
    }),
  }),
});

export const { useGetWeatherQuery, useLazyGetWeatherQuery } = weatherApi; //lazy triggers on demand. without lazy, data is fetched when the component mounts or when its arguments change.
