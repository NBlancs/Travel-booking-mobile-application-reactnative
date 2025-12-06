import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useColorScheme } from "react-native";
import { settingsStorage } from "../lib/api";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  error: string;
}

interface ThemeContextValue {
  themeMode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  useAmoledBlack: boolean;
  setUseAmoledBlack: (value: boolean) => Promise<void>;
}

const lightColors: ThemeColors = {
  background: "#F9FAFB",
  surface: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  primary: "#2563EB",
  error: "#DC2626",
};

const darkColors: ThemeColors = {
  background: "#111827",
  surface: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#374151",
  primary: "#3B82F6",
  error: "#EF4444",
};

const amoledDarkColors: ThemeColors = {
  ...darkColors,
  background: "#000000",
  surface: "#0D0D0D",
};

const THEME_MODE_KEY = "theme_mode";
const AMOLED_BLACK_KEY = "amoled_black";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const [useAmoledBlack, setUseAmoledBlackState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedMode = await settingsStorage.get<ThemeMode>(THEME_MODE_KEY, "light");
        const savedAmoled = await settingsStorage.get<boolean>(AMOLED_BLACK_KEY, false);
        setThemeModeState(savedMode);
        setUseAmoledBlackState(savedAmoled);
      } catch (err) {
        console.log("Error loading theme preferences:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadPreferences();
  }, []);

  // Determine if dark mode is active
  const isDark = useMemo(() => {
    if (themeMode === "auto") {
      return systemColorScheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, systemColorScheme]);

  // Get current color palette
  const colors = useMemo(() => {
    if (!isDark) return lightColors;
    return useAmoledBlack ? amoledDarkColors : darkColors;
  }, [isDark, useAmoledBlack]);

  // Set theme mode with persistence
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await settingsStorage.set(THEME_MODE_KEY, mode);
  }, []);

  // Set AMOLED black preference with persistence
  const setUseAmoledBlack = useCallback(async (value: boolean) => {
    setUseAmoledBlackState(value);
    await settingsStorage.set(AMOLED_BLACK_KEY, value);
  }, []);

  const value = useMemo(
    () => ({
      themeMode,
      isDark,
      colors,
      setThemeMode,
      useAmoledBlack,
      setUseAmoledBlack,
    }),
    [themeMode, isDark, colors, setThemeMode, useAmoledBlack, setUseAmoledBlack]
  );

  // Don't render until preferences are loaded
  if (!isLoaded) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
