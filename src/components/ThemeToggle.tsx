"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        onClick={toggleTheme}
        className={`mx-4 h-10 w-16 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
      >
        <div
          className={`flex h-8 w-8 transform items-center justify-center rounded-full transition-transform duration-300 ${
            theme === "dark"
              ? "translate-x-6 bg-gray-900"
              : "translate-x-0 bg-white"
          }`}
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-yellow-300" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </button>
    </>
  );
};

export default ThemeToggle;
