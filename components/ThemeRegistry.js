"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"; // Use v15-appRouter se seu Next.js for v15
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext({
  themeName: "dark",
  setThemeName: () => {},
});

export function useAppTheme() {
  return useContext(ThemeContext);
}

const colorSchemes = {
  light: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#dc2626" },
    background: { default: "#f4f6f8", paper: "#ffffff" },
  },

  dark: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f43f5e" },
    background: { default: "#0f172a", paper: "#1e293b" },
  },

  gameboy: {
    mode: "light",
    primary: { main: "#0f380f", contrastText: "#9bbc0f" },
    secondary: { main: "#306230", contrastText: "#9bbc0f" },
    background: { default: "#9bbc0f", paper: "#8bac0f" },
    text: { primary: "#0f380f", secondary: "#306230" },
    divider: "#306230",
  },

  gameboyDark: {
    mode: "dark",
    primary: { main: "#8bac0f", contrastText: "#0a140a" },
    secondary: { main: "#9bbc0f", contrastText: "#0a140a" },
    background: { default: "#0a140a", paper: "#132413" },
    text: { primary: "#cce885", secondary: "#8bac0f" },
    divider: "#306230",
  },

  neon: {
    mode: "dark",
    primary: { main: "#00f5d4", contrastText: "#09090b" },
    secondary: { main: "#ff007f", contrastText: "#ffffff" },
    background: { default: "#09090b", paper: "#13131f" },
    text: { primary: "#f8fafc", secondary: "#a5b4fc" },
  },
};

export default function ThemeRegistry({ children }) {
  const [themeName, setThemeName] = useState("dark");

  // Detecta a preferência do sistema operacional na primeira renderização no cliente
  useEffect(() => {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    setThemeName(prefersLight ? "light" : "dark");
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: colorSchemes[themeName] || colorSchemes.dark,
      }),
    [themeName],
  );

  return (
    <AppRouterCacheProvider>
      <ThemeContext.Provider value={{ themeName, setThemeName }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  );
}
