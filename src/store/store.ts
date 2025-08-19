import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./weatherApiSlice";
import searchHistoryReducer from "./searchHistorySlice";

export const store = configureStore({
  reducer: {
    searchHistory: searchHistoryReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [weatherApi.util.resetApiState.type],
      },
    }).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
