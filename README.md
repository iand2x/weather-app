# Weather App

A modern, responsive weather application built with React, TypeScript, and Redux Toolkit. Get real-time weather information for any city worldwide with a clean, intuitive interface.

![Weather App](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple?logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.1.2-green?logo=vite)

## ✨ Features

### 🌤️ Weather Information

- **Real-time weather data** from OpenWeather API
- **Current conditions** including temperature, humidity, and weather description
- **Feels-like temperature** for accurate comfort assessment
- **Weather icons** with visual representation of conditions
- **Location display** with city and country information
- **Timestamp** showing when data was last updated

### 🔍 Smart Search

- **City search** with optional country code specification
- **Input validation** with user-friendly error messages
- **Loading states** with smooth animations during API calls
- **Error handling** for network issues and invalid locations

### 📚 Search History Management

- **Persistent history** stored in localStorage across sessions
- **Duplicate prevention** - same city/country combinations are deduplicated
- **Recent-first ordering** with timestamps (e.g., "2h ago", "Just now")
- **Quick re-search** - click any history item to search again
- **Individual deletion** - remove specific entries with trash icon
- **Bulk clear** - clear entire history with one click
- **Configurable limit** - set maximum history items (1-50) via settings panel
- **Collapsible settings** - toggle gear icon to show/hide configuration

### 🎨 User Experience

- **Responsive design** - optimized for desktop, tablet, and mobile
- **Dark/Light theme** with automatic system preference detection
- **Theme persistence** - remembers your preference across sessions
- **Accessibility features** - ARIA labels, keyboard navigation, screen reader support
- **Smooth animations** - loading skeletons, fade-ins, and transitions
- **Glass morphism UI** - modern frosted glass design elements

### 🔧 Technical Features

- **TypeScript** - Full type safety throughout the application
- **Redux Toolkit** - Predictable state management with RTK Query
- **RTK Query** - Efficient data fetching with caching and error handling
- **Error boundaries** - Graceful error handling and recovery
- **Performance optimized** - Minimal re-renders and efficient updates
- **Modern React patterns** - Hooks, functional components, and best practices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- OpenWeather API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iand2x/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in project root
   echo "VITE_OPENWEATHER_API_KEY=your_api_key_here" > .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser** to `http://localhost:5173`

## 📦 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production with optimizations  |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |
| `npm test`        | Run test suite with Vitest               |

## 🏗️ Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   └── store.ts           # Store setup with RTK Query
├── features/              # Feature-based organization
│   ├── history/          # Search history management
│   │   ├── HistoryList.tsx
│   │   ├── HistoryList.css
│   │   └── searchHistorySlice.ts
│   ├── searchBar/        # Weather search functionality
│   │   ├── SearchBar.tsx
│   │   └── SearchBar.css
│   ├── themeSwitcher/    # Dark/light theme toggle
│   │   ├── ThemeSwitcher.tsx
│   │   └── ThemeSwitcher.css
│   └── weatherCard/      # Weather display & API
│       ├── WeatherCard.tsx
│       ├── WeatherCard.css
│       └── weatherApiSlice.ts
├── pages/                # Page components
│   ├── WeatherPage.tsx
│   └── WeatherPage.css
├── types/                # TypeScript type definitions
│   ├── history.ts
│   └── weather.ts
├── utils/                # Utility functions
│   ├── config.ts
│   └── isErrorMessage.ts
└── assets/               # Static assets
    ├── bg-dark.png
    └── bg-light.png
```

## 🛠️ Technology Stack

### Frontend Framework

- **React 19.1.1** - Modern UI library with latest features
- **TypeScript 5.8.3** - Type-safe development experience
- **Vite 7.1.2** - Lightning-fast build tool and dev server

### State Management

- **Redux Toolkit 2.8.2** - Simplified Redux with excellent DX
- **RTK Query** - Data fetching and caching solution
- **React Redux 9.1.2** - Official React bindings for Redux

### Styling & UI

- **CSS3** - Modern CSS with custom properties and grid/flexbox
- **React Icons 5.5.0** - Beautiful icon library
- **Responsive Design** - Mobile-first approach with breakpoints
- **Glass Morphism** - Modern frosted glass aesthetic

### Development Tools

- **ESLint** - Code quality and consistency
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **TypeScript ESLint** - TypeScript-specific linting rules

### API & Data

- **OpenWeather API** - Reliable weather data source
- **localStorage** - Client-side persistence for settings and history
- **Error Handling** - Comprehensive error states and recovery

## 🌐 API Integration

The app integrates with the [OpenWeather Current Weather API](https://openweathermap.org/current):

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Authentication**: API key required
- **Rate Limiting**: 1,000 calls/day (free tier)
- **Response Format**: JSON with comprehensive weather data
- **Error Handling**: Graceful fallbacks for API failures

## 🎯 Key Implementation Highlights

### Redux Toolkit Query Integration

- Efficient caching with automatic invalidation
- Loading and error states managed automatically
- Optimistic updates for better UX
- Request deduplication to prevent unnecessary API calls

### Advanced Search History

- Smart deduplication based on city/country combinations
- Configurable history length with real-time updates
- Persistent storage with error handling for localStorage failures
- Time-based formatting ("2h ago", "Just now", etc.)

### Responsive Theme System

- CSS custom properties for consistent theming
- System preference detection with manual override
- Smooth transitions between light and dark modes
- Persistent theme selection across browser sessions

### Accessibility First

- Semantic HTML structure with proper landmarks
- ARIA labels and live regions for screen readers
- Keyboard navigation support throughout the interface
- High contrast ratios meeting WCAG guidelines

## 🔮 Future Enhancements

- [ ] **Extended Forecast** - 5-day weather predictions
- [ ] **Location Services** - GPS-based current location detection
- [ ] **Weather Maps** - Interactive radar and satellite imagery
- [ ] **Push Notifications** - Weather alerts and daily forecasts
- [ ] **Offline Support** - PWA capabilities with service workers
- [ ] **Multiple Locations** - Save and track favorite cities
- [ ] **Weather Widgets** - Customizable dashboard components
- [ ] **Data Visualization** - Charts for temperature trends and patterns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeather](https://openweathermap.org/) for providing the weather API
- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icon set
- [Redux Toolkit](https://redux-toolkit.js.org/) for excellent state management DX
- [Vite](https://vitejs.dev/) for the amazing development experience

---

Built with ❤️ by [iand2x](https://github.com/iand2x)
