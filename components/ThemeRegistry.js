"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  Inter,
  Pixelify_Sans,
  Chakra_Petch,
  Yellowtail,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const vaporFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const viceFont = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
});

const STORAGE_KEY = "bitsmonster-theme";

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
    primary: { main: "#ff71ce", contrastText: "#120428" },
    secondary: { main: "#01cdfe", contrastText: "#120428" },
    warning: { main: "#ffbe0b" },
    background: { default: "#120428", paper: "#1f0c3d" },
    text: { primary: "#f8f0ff", secondary: "#c4b5fd" },
    divider: "rgba(255, 113, 206, 0.25)",
  },
};

const themeFonts = {
  light: inter.style.fontFamily,
  dark: inter.style.fontFamily,
  gameboy: pixelFont.style.fontFamily,
  gameboyDark: pixelFont.style.fontFamily,
  neon: vaporFont.style.fontFamily,
};

export default function ThemeRegistry({ children }) {
  const [themeName, setThemeNameState] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme && colorSchemes[savedTheme]) {
      setThemeNameState(savedTheme);
    } else {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)",
      ).matches;
      setThemeNameState(prefersLight ? "light" : "dark");
    }

    setMounted(true);
  }, []);

  const setThemeName = (newTheme) => {
    setThemeNameState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const theme = useMemo(() => {
    const isNeon = themeName === "neon";

    return createTheme({
      palette: colorSchemes[themeName] || colorSchemes.dark,
      typography: {
        fontFamily: themeFonts[themeName] || inter.style.fontFamily,
        ...(isNeon && {
          h1: { fontFamily: viceFont.style.fontFamily },
          h2: { fontFamily: viceFont.style.fontFamily },
          h3: { fontFamily: viceFont.style.fontFamily },
          h4: { fontFamily: viceFont.style.fontFamily },
          h5: { fontFamily: viceFont.style.fontFamily },
          h6: { fontFamily: viceFont.style.fontFamily, letterSpacing: "1.5px" },
        }),
      },
    });
  }, [themeName]);

  if (!mounted) {
    return null;
  }

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
