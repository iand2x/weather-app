import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchHistoryState, SearchHistoryItem } from "@/types/history";

const initialState: SearchHistoryState = {
  items: [],
  maxLength: 10,
};

// Load initial state from localStorage
function loadInitialState(): SearchHistoryState {
  try {
    const stored = localStorage.getItem("weather-search-history");
    if (stored) {
      const items = JSON.parse(stored) as SearchHistoryItem[];
      return { ...initialState, items };
    }
  } catch (error) {
    console.warn("Error loading search history from localStorage:", error);
  }
  return initialState;
}

// Save state to localStorage
function saveToLocalStorage(items: SearchHistoryItem[]) {
  try {
    localStorage.setItem("weather-search-history", JSON.stringify(items));
  } catch (error) {
    console.warn("Error saving search history to localStorage:", error);
  }
}

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: loadInitialState(),
  reducers: {
    addSearchToHistory: (
      state,
      action: PayloadAction<{ city: string; country?: string }>
    ) => {
      const { city, country } = action.payload;
      const normalizedCity = city.trim().toLowerCase();
      const normalizedCountry = country?.trim().toLowerCase();

      // Remove any existing entry with the same city/country combination
      state.items = state.items.filter((item) => {
        const itemCity = item.city.toLowerCase();
        const itemCountry = item.country?.toLowerCase();
        return !(
          itemCity === normalizedCity && itemCountry === normalizedCountry
        );
      });

      // Add new entry at the beginning
      const newEntry: SearchHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        city: city.trim(),
        country: country?.trim(),
        timestamp: Date.now(),
      };

      state.items.unshift(newEntry);

      // Keep only the most recent entries up to maxLength
      if (state.items.length > state.maxLength) {
        state.items = state.items.slice(0, state.maxLength);
      }

      // Save to localStorage
      saveToLocalStorage(state.items);
    },

    removeSearchFromHistory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },

    clearSearchHistory: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },

    setMaxHistoryLength: (state, action: PayloadAction<number>) => {
      state.maxLength = action.payload;
      if (state.items.length > state.maxLength) {
        state.items = state.items.slice(0, state.maxLength);
        saveToLocalStorage(state.items);
      }
    },
  },
});

export const {
  addSearchToHistory,
  removeSearchFromHistory,
  clearSearchHistory,
  setMaxHistoryLength,
} = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
