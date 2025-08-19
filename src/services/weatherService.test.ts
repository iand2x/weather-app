import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getWeather, WeatherServiceError } from "./weatherService";

// Mock axios
vi.mock("axios");

// Mock config
vi.mock("../config", () => ({
  OPENWEATHER_API_KEY: "test-api-key",
  OPENWEATHER_BASE: "https://api.openweathermap.org/data/3.0",
}));

const mockAxiosGet = vi.fn();
const mockIsAxiosError = vi.fn();

// Setup axios mocks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axios as any).get = mockAxiosGet;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axios as any).isAxiosError = mockIsAxiosError;

describe("weatherService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getWeather", () => {
    it("should fetch and map weather data successfully", async () => {
      const mockResponse = {
        data: {
          name: "London",
          sys: { country: "GB" },
          main: {
            temp: 15.5,
            feels_like: 13.2,
            humidity: 80,
            pressure: 1013,
          },
          weather: [
            {
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],
          wind: {
            speed: 3.5,
            deg: 240,
          },
          visibility: 10000,
        },
      };

      mockAxiosGet.mockResolvedValueOnce(mockResponse);

      const result = await getWeather({ city: "London", country: "GB" });

      expect(result).toEqual({
        city: "London",
        country: "GB",
        temperature: 16, // rounded
        feelsLike: 13, // rounded
        condition: "Clouds",
        description: "overcast clouds",
        icon: "04d",
        humidity: 80,
        pressure: 1013,
        windSpeed: 3.5,
        windDirection: 240,
        visibility: 10000,
      });

      expect(mockAxiosGet).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/3.0/weather",
        {
          params: {
            q: "London,GB",
            appid: "test-api-key",
            units: "metric",
          },
          timeout: 10000,
        }
      );
    });

    it("should handle city only (no country)", async () => {
      const mockResponse = {
        data: {
          name: "Paris",
          sys: { country: "FR" },
          main: { temp: 20, feels_like: 19, humidity: 65, pressure: 1015 },
          weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
          wind: { speed: 2.1 },
        },
      };

      mockAxiosGet.mockResolvedValueOnce(mockResponse);

      await getWeather({ city: "Paris" });

      expect(mockAxiosGet).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            q: "Paris", // no country suffix
          }),
        })
      );
    });

    it("should throw WeatherServiceError for 404 (city not found)", async () => {
      const axiosError = {
        response: { status: 404 },
        isAxiosError: true,
      };
      mockAxiosGet.mockRejectedValueOnce(axiosError);
      mockIsAxiosError.mockReturnValueOnce(true);

      //   await expect(getWeather({ city: "InvalidCity" })).rejects.toThrow(
      //     WeatherServiceError
      //   );
      await expect(getWeather({ city: "InvalidCity" })).rejects.toThrow(
        'City "InvalidCity" not found. Please check the spelling and try again.'
      );
    });

    it("should throw WeatherServiceError for 401 (invalid API key)", async () => {
      const axiosError = {
        response: { status: 401 },
        isAxiosError: true,
      };
      mockAxiosGet.mockRejectedValueOnce(axiosError);
      mockIsAxiosError.mockReturnValueOnce(true);

      //   await expect(getWeather({ city: "London" })).rejects.toThrow(
      //     WeatherServiceError
      //   );
      await expect(getWeather({ city: "London" })).rejects.toThrow(
        "Invalid API key"
      );
    });

    it("should throw WeatherServiceError for timeout", async () => {
      const axiosError = {
        code: "ECONNABORTED",
        message: "timeout of 10000ms exceeded",
        isAxiosError: true,
      };
      mockAxiosGet.mockRejectedValueOnce(axiosError);
      mockIsAxiosError.mockReturnValueOnce(true);

      //   await expect(getWeather({ city: "London" })).rejects.toThrow(
      //     WeatherServiceError
      //   );
      await expect(getWeather({ city: "London" })).rejects.toThrow(
        "Request timed out"
      );
    });

    it("should throw WeatherServiceError for network errors", async () => {
      const axiosError = {
        response: { status: 500 },
        isAxiosError: true,
      };
      mockAxiosGet.mockRejectedValueOnce(axiosError);
      mockIsAxiosError.mockReturnValueOnce(true);

      //   await expect(getWeather({ city: "London" })).rejects.toThrow(
      //     WeatherServiceError
      //   );
      await expect(getWeather({ city: "London" })).rejects.toThrow(
        "Failed to fetch weather data. Please check your internet connection."
      );
    });

    it("should throw WeatherServiceError for empty city name", async () => {
      await expect(getWeather({ city: "" })).rejects.toThrow(
        WeatherServiceError
      );
      await expect(getWeather({ city: "" })).rejects.toThrow(
        "City name is required"
      );
    });

    it("should handle missing weather data gracefully", async () => {
      const mockResponse = {
        data: {
          name: "TestCity",
          sys: { country: "TC" },
          main: { temp: 25, feels_like: 26, humidity: 50, pressure: 1000 },
          weather: [], // empty weather array
          wind: { speed: 1.0 },
        },
      };

      mockAxiosGet.mockResolvedValueOnce(mockResponse);

      const result = await getWeather({ city: "TestCity" });

      expect(result.condition).toBe("Unknown");
      expect(result.description).toBe("No description");
      expect(result.icon).toBe("01d");
    });
  });
});
