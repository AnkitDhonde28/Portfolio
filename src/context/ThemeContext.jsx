import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const defaultColor = "#38bdf8";

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || defaultColor;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--theme-primary", themeColor);

    const hex = themeColor.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    root.style.setProperty(
      "--theme-rgb",
      `${r}, ${g}, ${b}`
    );

    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}