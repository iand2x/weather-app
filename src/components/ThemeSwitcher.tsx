import { useState, useEffect } from "react";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply theme to document body
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="theme-switcher"
    >
      <span className="theme-icon">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
